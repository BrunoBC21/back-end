const servicoService = require("../src/services/serivcoService");

const servicoControllers = {
    create: async (req, res) => {
        try {
            const servico = {
                modalidade: req.body.modalidade,
                preco: req.body.preco,
                //recorrencia: req.body.recorrencia,
                //descricao: req.body.descricao
            }
            const response = await servicoService.criarServico(servico)
            res.status(response.status).json({response: response.msg || response.error})

        } catch (error) {
            res.json(error);
        }
    },

    getAll: async(req, res) => {
        try {
            const response = await servicoService.buscarTodosServicos()
            res.status(response.status).json({response: response.msg || response.error});
            
        } catch (error) {
            res.json(error)
        }
    }
}

module.exports = servicoControllers;