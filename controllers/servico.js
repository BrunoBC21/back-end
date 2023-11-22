const {Servico: ServicoModels} = require("../models/servico");


const servicoControllers = {
    create: async (req, res) => {
        try {
            const servico = {
                modalidade: req.body.modalidade,
                preco: req.body.preco,
                //recorrencia: req.body.recorrencia,
                //descricao: req.body.descricao,
                status: req.body.status,
            }
            const response = await ServicoModels.create(servico);
            res.status(200).json({msg:response});

        } catch (error) {
            console.log(error);
        }
    },

    getAll: async(req, res) => {
        try {
            //const quadras = await ServicoModels.findOne({id:"6547d8c52d8557282cff68f4"})
            //const i = quadras.modalidade
            
            //res.json({quadras});
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = servicoControllers;