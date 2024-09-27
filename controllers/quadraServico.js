const { response } = require("express");
const {QuadraServico: quadraServicoModel} = require("../models/quadraServico");
const {Servico: servicoModel} = require("../models/servico");
const {Quadra: quadraModel} = require("../models/quadra");

const quadraServicoController = {
    create: async (req, res) => {
        try {
            const idQuadra = await quadraModel.findOne({numero: req.body.quadra}).select("_id")
            const idServico = await servicoModel.findOne({modalidade: req.body.servico}).select("_id")
            console.log(idServico)

            const quadraServicos = {            
                quadra: idQuadra,
                servico: idServico
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