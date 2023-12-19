const {Agendamento: agendamentoModel, Agendamento} = require("../models/agendamento");
const {Cancelado: canceladoModel} = require("../models/cancelado");
const {Quadra: quadraModel} = require("../models/quadra");
const {Servico: servicoModel} = require("../models/servico");

const cancelamentoController = {
    create: async (req, res) => {
        try {
            const usuario = req.usuario
            const {quadra, servico, dias} = req.body
            
            const idQuadra = await quadraModel.findOne({numero: quadra}).select("_id");
            const idServico = await servicoModel.findOne({modalidade: servico}).select("_id");

            const agendamentoCancelar = await agendamentoModel.findOne({data: dias, quadra: idQuadra, servico: idServico, cliente: usuario}).select("_id")
      

            const cancelar = await canceladoModel.create({data: dias, quadra: idQuadra, servico: idServico, cliente: usuario})
            const apagarAgendamento = await agendamentoModel.deleteOne({_id: agendamentoCancelar});

            res.status(201).json({msg: "Cancelado realizado com sucesso!"});
            
        } catch (error) {
            res.json({error});
        }
    },

    mostrarCancelamentos: async(req, res)=> {
        try {
          const cancelado = await canceladoModel.find().select("_id");
          const array = []
          const canceladoDados = []

          for (let i = 0;  i< cancelado.length; i++) {
            array.push(await canceladoModel.findOne({_id: cancelado[i]}).populate("servico").populate("cliente").populate("quadra"))
            canceladoDados.push({
                data:    array[i].data,
                quadra:  array[i].quadra.numero,
                servico: array[i].servico.modalidade,
                cliente: array[i].cliente.nome
            })
          }
          res.status(200).json({canceladoDados});
            
        } catch (error) {
            res.json({error})
        }
    }
}

module.exports = cancelamentoController;