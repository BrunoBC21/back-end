const {Agendamento: agendamentoModel} = require("../models/agendamento");
const {Servico: servicoModel} = require("../models/servico");
const {Quadra: quadraModel} = require("../models/quadra");
const {QuadraServico: quadraServicoModel} = require("../models/quadraServico");
const {Horario: horarioModel} = require("../models/horario");

const agendamentoController = {
    create: async (req, res) => {
        try {
            const agendamento = {
                data: req.body.data,
                //valor: req.body.valor,
                //trasacao: req.body.trasacao,
                horario: req.body.horario,
                quadra: req.body.quadra,
                //cliente: req.body.cliente,
                servico: req.body.servico,
            }

            const response = await agendamentoModel.create(agendamento);
            res.status(200).json({response})

        } catch (error) {
            console.log(error)
        }
    },

    associarQuadraServico: async (req, res) => {
        try {
            const {quadra, servico} = req.body

            //Pegando os ids do número da quadra e do servico.
            const idQuadra  = await quadraModel.findOne({numero: quadra}).select("_id");
            const idServico = await servicoModel.findOne({modalidade: servico}).select("_id");
            const idHorario = await horarioModel.findOne().select("_id");
        
            //Criando a associação entre quadra e servico
            const quadraServico = {data: 0, horario: idHorario, quadra: idQuadra, servico: idServico}
            
            const response = await agendamentoModel.create(quadraServico);
            res.status(201).json({response, msg: "Associação criada com sucesso!"})



        } catch (error) {
            console.error(error)
        }


    },
    getServicosQuadras: async (req, res) => {
        try {
            const {servico, data} = req.body;

            //Pegando o id do servico.
            const idServico = await servicoModel.findOne({modalidade: servico}).select("_id");

            //Pegando todas as quadras/agendamentos com o id de servico selecionado.
            const quadraServico = await agendamentoModel.find({servico: idServico}).select("_id");

            const idHorario = await horarioModel.findOne()
            const horarioIncio = parseInt(idHorario.inicio);
            const horarioFinal = parseInt(idHorario.fim);
            const horasEstabelecidas = 6

            async function buscarHorariosDisponiveis (data, hora){
                const quadrasDisponiveis = []
                const array = []

                for (let e = 0; e < quadraServico.length; e++) {
                        //Verificando se os ids das quadrasServicos estão agendados para as horas selecionadas. 
                        quadrasDisponiveis.push(await agendamentoModel.findOne({_id: quadraServico[e], data: data}).select("_id"))
            
                        if(quadrasDisponiveis[e] == null) {
                            const quadra = await agendamentoModel.findOne({_id: quadraServico[e]}).populate("quadra")
                            const numeroQuadra = quadra.quadra.numero
        
                            array.push(numeroQuadra+" "+hora)
                        }
                        console.log(data)
                }
                return array
            }
            const  promises=[]
            const array =[]

            for (let i = 0; i < horasEstabelecidas; i++) {
                // Tratando o formato de data que está vindo do front-end.
                const dataHorario = data[0]+'-'+data[1]+"-"+(horarioIncio +i);
                promises.push(buscarHorariosDisponiveis(dataHorario, horarioIncio + i))
            }

            const p = await Promise.all(promises)
            const horarioDisponiveisQuadras = p.flat()

            res.json({horarioDisponiveisQuadras})
            
        } catch (error) {
            console.log(error)
        }
    },
    getQuadras: async (req, res) => {
        try {
            const quadras = await agendamentoModel.find().populate("quadra").populate("servico")
            res.json({quadras})

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = agendamentoController