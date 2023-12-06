const {Servico: ServicoModels} = require("../models/servico");


const servicoControllers = {
    create: async (req, res) => {
        try {
            const servico = {
                modalidade: req.body.modalidade,
                preco: req.body.preco,
                //recorrencia: req.body.recorrencia,
                //descricao: req.body.descricao
            }
            const servicoExistente = await ServicoModels.findOne({servico});
            if (servicoExistente) {
                return res.status(201).json({msg: "Servico criado com sucesso!"})
            }
            const response = await ServicoModels.create(servico);
            res.status(201).json({msg: "Servico criado com sucesso"});

        } catch (error) {
            console.log(error);
        }
    },

    getAll: async(req, res) => {
        try {
            const servicosId = await ServicoModels.find()
            
            res.json({servicosId});
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = servicoControllers;