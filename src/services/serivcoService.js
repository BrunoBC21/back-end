const servicoRepository = require("../repositories/ServicoRepository")

const servicoService = {
    criarServico: async (servico)=> {
        try {
            const response = await servicoRepository.buscarServico({modalidade: servico.modalidade})
            
            if (response) {
                return {status: 409, msg: "Servico já existe!"}
                
            } else {
                await servicoRepository.criarServico(servico);
                return {status: 201, msg: "Servico criado com sucesso"}
            }

        } catch (error) {
            return {status: 500, error:"Erro ao criar servico"}
        }
    },
    buscarTodosServicos: async ()=> {
        try {
            return {status: 200, msg: await servicoRepository.buscarTodosServicos()}
        } catch (error) {
            return {status: 500, error:"Erro ao criar servico"}
        }
    }
}

module.exports = servicoService