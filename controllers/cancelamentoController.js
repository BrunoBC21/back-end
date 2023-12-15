const {Agendamento: agendamentoModel, Agendamento} = require("../models/agendamento");
const {Cancelado: canceladoModel} = require("../models/cancelado");

const cancelamentoController = {
    create: async (req, res) => {
        try {
            const {idAgendamento} = req.body
            
            
            const agendamentoCancelar = await agendamentoModel.findOne({idAgendamento}).populate("quadra").populate("servico")
            const cancelamento = {
                data: agendamentoCancelar.data,
                quadra: agendamentoCancelar.quadra.numero,
                servico: agendamentoCancelar.servico.modalidade,
                //cliente: agendamentoCancelar.cliente.nome
            }
            const dados = {cancelado: agendamentoCancelar}
            console.log(cancelamento)

            /*const respone = await canceladoModel.create(dados);
            res.json({respone})*/
            const asss = await canceladoModel.findOne();
            res.json({msg: asss.quadra})
            //res.json(await canceladoModel.find().populate("quadra"))
            //const apagar = agendamentoModel.findOneAndDelete(idAgendamento);
            
        } catch (error) {
            res.json({error});
        }
    }
}

module.exports = cancelamentoController;