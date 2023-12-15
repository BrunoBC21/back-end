const { response } = require("express");
const {QuadraServico: quadraServicoModel} = require("../models/quadraServico");

const quadraServicoController = {
    create: async (req, res) => {
        try {
            const quadraServicos = {
                quadra: req.body.quadra,
                servico: req.body.servico
            }
            const response = await quadraServicoModel.create(quadraServicos);
            res.status(201).json({response, msg: "Serviço criado com sucesso!"});

        } catch (error) {
            res.json(error);
        }
    },

    getAll: async (req, res) => {
        try {
            const quadras = await quadraServicoModel.find();
            res.json({quadras})

        } catch (error) {
            res.json(error)
        }
    },

    delete: async (req, res) => {
        try {
            const numero = req.body.numero;
            const quadra = await quadraModel.findOne({numero});

            if (!quadra) {
                res.json({msg: "Quadra não existe"});
                return
            }
            const quadraDelete = await quadraModel.deleteOne({numero})

            res.status(204).json({msg: "Quadra deletada com sucesso", quadraDelete});
            

        } catch (error) {
            res.json(error)
        }
       
    },
    update: async (req, res) => {
        try {
            const quadra = {
                numero: req.body.numero,
                foto: req.body.foto
            }
            
            const response = await quadraModel.updateOne(quadra);
            res.status(200).json({response, msg: "Serviço atualizado com sucesso!"});

        } catch (error) {
            res.json(error);
        }
    }
}

module.exports = quadraServicoController