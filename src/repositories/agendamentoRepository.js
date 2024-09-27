const {Agendamento: agendamentoModel} = require("../models/agendamento");

const agendamentoRepository = {
    criarAgendamento: async (dados)=> {
        try {
            const resposta = await agendamentoModel.create(dados);
            return
            
        } catch (error) {
            return {error: error}
        }
    }
}

module.exports = agendamentoRepository