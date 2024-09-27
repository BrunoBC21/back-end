const {Servico: ServicoModels} = require("../../models/servico");

const servicoRepository = {
    criarServico: async (servico)=> {
        try {
            await ServicoModels.create(servico);
            return

        } catch (error) {
            return {error: error}
        }
    },

    buscarServico: async (servico)=> {
        try {
            const servicoExistente = await ServicoModels.findOne(servico)
            return servicoExistente

        } catch (error) {
            return {error: error}
        }
    },

    buscarTodosServicos: async ()=> {
        try {
            const servicoExistente = await ServicoModels.find()
            return servicoExistente

        } catch (error) {
            return {error: error}
        }
    }
}

module.exports = servicoRepository