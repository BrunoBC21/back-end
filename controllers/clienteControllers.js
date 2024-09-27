const {Cliente: ClienteModel, Cliente} = require("../models/cliente");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { model } = require("mongoose");
const clienteService = require("../src/services/clienteService")
const validarCampos = require("../utils/validarCamposUtil")

const clienteController = {
    create: async(req, res)=> {
        try {
            const cliente = {
                nome: req.body.nome,
                telefone: req.body.telefone,
                email: req.body.email,
                senha: req.body.senha,
                //foto: req.body.foto,
            }
            
            const validar = validarCampos.validar(cliente)
            if (validar) {
                return res.status(400).json({error: validar.error})
            }

            const resultado = await clienteService.criarUsuario(cliente);
    
            if (resultado.status >= 400) {
                return res.status(resultado.status).json({ error: resultado.error });
            }
    
            return res.status(resultado.status).json({ response: resultado.response, msg: resultado.msg });

        } catch (error) {
            console.log(error);
        }

    },

    getAll: async(req, res) => {
        try {
            const user = await clienteService.todosUsuarios()
            return res.status(200).json({msg: user.msg});

        } catch (error) {
            console.log(error);
        }
    },

    delete: async(req, res) => {
        try {
            const cliente = req.usuario
            await clienteService.deletarUsuario(cliente)
            return res.status(204).json({msg: "Usuário deletado"})

        } catch (error) {
            console.log(error)
        }
    },

    update: async(req, res) => {
        const id = req.params.id;
        try {
            const cliente = {
                nome: req.body.nome,
                telefone: req.body.telefone,
                email: req.body.email,
                senha: req.body.senha,
                foto: req.body.foto,
                status: req.body.status
            };

            const updateCliente = await ClienteModel.findByIdAndUpdate(id, cliente);

            if(!updateCliente) {
                res.status(404).json({msg: "Serviço não encontrado"})
                return;
            };
            res.status(200).json({cliente, msg: "Atulizado com sucesso"})

        } catch (error) {
            res.json(error)
        }
    },

    login: async (req, res) => {
        try {
            const { email, senha } = req.body;

            // Checando se os campos estão vazios.
            if(!email && !senha) {
                return res.status(422).json({msg: "Email e senha são obrigatórios"});
            }
             
            else if(!email) {
                return res.status(422).json({msg: "Email é obrigatória"})
            }
            else if(!senha) {
                return res.status(422).json({msg: "Senha obrigatória"});
            }
    
            // Checando se o usuário existe.
            const user = await ClienteModel.findOne({email: email});

            if(!user) {
                return res.status(422).json({msg: "Email ou senha inválido!"})
            }
  
            // Checagem de senha
           const checandoSenha = await bcrypt.compare(senha, user.senha);

            if(!checandoSenha){
                return res.status(422).json({msg: "Email ou senha inválido!"})
            }

            //Criando o token
            const secret = process.env.SECRET
            const token = jwt.sign({subject: user.id, role: user.role}, secret, {expiresIn: "1d"})

            res.status(200).json({msg: user.role, token: token});

        } catch (error) {
            res.status(500).json({ error: "Error login"});
        }
    },
    privilegioUsuario: async (req, res)=> {
        try {
            const email = req.body.email
            const id = await ClienteModel.findOne({email: email}).select("_id")
            const upUser = await ClienteModel.updateOne({_id: id}, {role: "admin"});
            res.status(201).json({upUser});

        } catch (error) {
            
        }
    }

}
module.exports = clienteController