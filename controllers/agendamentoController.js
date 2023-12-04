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

            const quadra = [], idQuadra = []
            for (let i = 0; i < quadraServico.length; i++) {
                quadra.push(await agendamentoModel.findOne({_id: quadraServico[i]}).populate("quadra").select("_id"))
                idQuadra.push(quadra[i].quadra.id)
                console.log(idQuadra)
                
            }

            console.log(await agendamentoModel.findOne({_id: idQuadra[0], data: data}).select("_id"))
            //console.log(idQuadra)
            //Buscando o id dos horários cadastrados pelo admin.
            const idHorario = await horarioModel.findOne()
            const horarioInicial = 16
            const horarioFinal = parseInt(idHorario.fim);
            //Subtraindo a hora do fim do espediente pela de início.
            const horasEstabelecidas = (horarioFinal - horarioInicial)

            async function buscarHorariosDisponiveis (data, hora){
                const quadrasDisponiveis = []
                const array = []

                for (let e = 0; e < idQuadra.length; e++) {
                        //Verificando se os ids das quadrasServicos estão agendados para as horas selecionadas. 
                        quadrasDisponiveis.push(await agendamentoModel.findOne({_id: idQuadra[e], data: data}).select("_id"))
            
                        if(quadrasDisponiveis[e] == null) {
                            const quadra = await agendamentoModel.findOne({_id: quadraServico[e]}).populate("quadra")
                            const numeroQuadra = quadra.quadra.numero
        
                            array.push(numeroQuadra+" "+hora)
                        }
                }
                return array
            }
            const  promises=[]
            const array =[]

            for (let i = 0; i < horasEstabelecidas; i++) {
                // Tratando o formato de data que está vindo do front-end.
                const dataHorario = data[0]+'-'+data[1]+"-"+(horarioInicial +i);
                promises.push(buscarHorariosDisponiveis(dataHorario, horarioInicial + i))
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