const {Agendamento: agendamentoModel} = require("../models/agendamento");
const {Cancelado: canceladoModel} = require("../models/cancelado");

const cancelamentoController = {
    create: async (req, res) => {
        try {
            const {idAgendamento} = req.body
            const dados = {cancelado: idAgendamento}
            
            
            //const respone = await canceladoModel.create(dados);
            res.json(await canceladoModel.find().populate("quadra"))
            //const apagar = agendamentoModel.findOneAndDelete(idAgendamento);
            
        } catch (error) {
            res.json({error});
        }
    }
}

module.exports = cancelamentoController;