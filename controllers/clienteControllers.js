const {Cliente: ClienteModel, Cliente} = require("../models/cliente");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const clienteController = {
    create: async(req, res)=> {
        try {
            // Criptografando senha de usuário
            //const saltRounds = bcrypt.genSalt(12);
            //const senhaHash = await bcrypt.hash(req.body.senha, saltRounds);

            const cliente = {
                nome: req.body.nome,
                telefone: req.body.telefone,
                email: req.body.email,
                senha: req.body.senha//senhaHash,
                //foto: req.body.foto,
                //status: req.body.status
            }
            // Validações de email e telefone
            const validarEmail = /\w+@\w+\.\w/;
            const validarTelefone = /\(?\d{2}\)?\d{4,5}-?\d{4}/
            
           // console.log(senhaHash)


            if (validarEmail.test(cliente.email) == true && validarTelefone.test(cliente.telefone) == true && cliente.telefone.length < 15) {
                const {telefone, email} = cliente
                const user = await ClienteModel.findOne({telefone, email});

                if (user) {
                    res.status(409).json({error:"Email e número de telefone já existem no sistema"});
                    return
                }

                else if (await ClienteModel.findOne({email})) {
                
                    res.status(409).json({error:"Email já existe no sistema"});
                    return
                }

                else if (await ClienteModel.findOne({telefone})) {
                    res.status(409).json({error:"Telefone já existe no sistema"});
                    return
                }
                
                const response = await ClienteModel.create(cliente);
                res.status(201).json({response, msg:"Serviço criado com sucesso"})
                

            }
            else if ((validarTelefone.test(cliente.telefone) == false || cliente.telefone.length > 14) && validarEmail.test(cliente.email) == false) {
                res.send("Email e número de telefone inválidos!")
            }
            else if (validarTelefone.test(cliente.telefone) == false || cliente.telefone.length > 14) {
                res.send("Número de telefone inválido!");
            }
            else if (validarEmail.test(cliente.email) == false) {
                res.send("Email inválido");
            }

        } catch (error) {
            console.log(error);
        }

    },

    getAll: async(req, res) => {
        try {
            const cliente = await ClienteModel.find();
            res.json(cliente);

        } catch (error) {
            console.log(error);
        }
    },

    getDados: async(req, res) => {
        try {
            const id = req.params.id;
            const cliente = await ClienteModel.findById(id);

            if(!cliente) {
                res.status(404).json({msg: "Serviço não encontrado"})
                return;
            }

            res.json(cliente)

        } catch (error) {
            
        }
    },

    delete: async(req, res) => {
        try {
            const id = req.params.id;
            const cliente = await ClienteModel.findById(id)

            if(!cliente) {
                res.status(404).json({msg: "Serviço não encontrado"})
                return;
            };

            const deleteCliente = await ClienteModel.findByIdAndDelete(id);
            res.status(200)
                .json({deleteCliente, msg: "Serviço deletado com sucesso"});

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
            console.log(error)
        }
    },
    /*login: async (req, res) => {
        try {
            const { email, senha } = req.body;

            // Checando se os campos estão vazios.
            if(!email && !senha) {
                res.status(422).json({msg: "Email e senha são obrigatórios"});
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

            const token = jwt.sign({
                id: user._id
            }, secret,)

            res.status(200).json({msg: "Sucesso na autenticação", token});
          
     

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error during login" });
        }
    }*/

    
}

module.exports = clienteController