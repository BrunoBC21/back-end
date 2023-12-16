const {Agendamento: agendamentoModel} = require("../models/agendamento");
const {Servico: servicoModel} = require("../models/servico");
const {Quadra: quadraModel} = require("../models/quadra");
const {QuadraServico: quadraServicoModel} = require("../models/quadraServico");
const {Horario: horarioModel} = require("../models/horario");

const agendamentoController = {
    create: async (req, res) => {
        try {
            const { data, transacao, quadra, servico,  horas} = req.body
            const cliente = req.usuario
            //Calculando o preco total dos horários selecionados para o agendamento.
            const idHorario = await horarioModel.findOne().select("_id")
            const idQuadra  = await quadraModel.findOne({numero: quadra}).select("_id")
            const idServico = await servicoModel.findOne({modalidade: servico}).select("_id");

            const preco = await servicoModel.findOne({servico: idServico})
            const valorTotalQuadras = horas.length * preco.preco

            if(horas.length > 1) {
                for (let i = 0; i < horas.length; i++) {
                    const agendamento = {
                        data: data[0]+"/"+data[1]+"/"+horas[i],
                        valor: preco.preco,
                        transacao: transacao,
                        horario: idHorario,
                        quadra: idQuadra,
                        cliente: cliente,
                        servico: idServico
                    }
                    console.log(agendamento);
                    const resposta = await agendamentoModel.create(agendamento);
                }
                res.status(201).json({msg: "Parabéns, agendamento realizado com sucesso!"})
            }

            else {
                const agendamento = {
                    data: data[0]+"/"+data[1]+"/"+horas,
                    valor: preco.preco,
                    transacao: transacao,
                    horario: idHorario,
                    quadra: idQuadra,
                    cliente: cliente,
                    servico: idServico
                }
                console.log(agendamento);
                const resposta = await agendamentoModel.create(agendamento);
                res.status(201).json({msg: "Parabéns, agendamento realizado com sucesso!"});
            }
            
        } catch (error) {
            res.json(error)
        }
    },

    associarQuadraServico: async (req, res) => {
        try {
            const {quadra, servico}=req.body

            //Pegando os ids do número da quadra e do servico.
            const idQuadra  = await quadraModel.findOne({numero: quadra}).select("_id");
            const idServico = await servicoModel.findOne({modalidade: servico}).select("_id");
            const idHorario = await horarioModel.findOne().select("_id");
        
            //Criando a associação entre quadra e servico
            const quadraServico = {data: 0, horario: idHorario, quadra: idQuadra, servico: idServico, status: 'C'}
            const verificar = await agendamentoModel.findOne({quadra: idQuadra})

            if(verificar) {
                return res.status(200).json({msg: "Não é possível associar o número de quadra com servico, pois já estão vinculados!"})
            }
            
            const response = await agendamentoModel.create(quadraServico);
            res.status(201).json({response, msg: "Associação criada com sucesso!"})

        } catch (error) {
            res.json(error)
        }
    },

    getServicosQuadras: async (req, res) => {
        try {
            const {servico, data} = req.body;

            //Pegando o id do servico.
            const idServico = await servicoModel.findOne({modalidade: servico}).select("_id");

            //Pegando todas as quadras/agendamentos com o id de servico selecionado.
            const quadraServico = await agendamentoModel.find({servico: idServico, status:'C'}).select("_id");


            //Pegando todos os ids dos número
            const quadra = [], idQuadra = []

            for (let i = 0; i < quadraServico.length; i++) {
                quadra.push(await agendamentoModel.findOne({_id: quadraServico[i]}).populate("quadra").select("_id"))
                idQuadra.push(quadra[i].quadra._id)
            }

            //Buscando o id dos horários cadastrados pelo admin.
            const idHorario = await horarioModel.findOne()
            
            //horarioCalculo para fazer a validição de acima de 23h. 
            let horarioCalculo = parseInt(idHorario.inicio)
            let horarioInicio = parseInt(idHorario.inicio)
            let horarioFinal  = parseInt(idHorario.fim)

            if(horarioFinal < horarioInicio) {
                horarioFinal += 24
            }
            const horasEstabelecidas = parseInt(horarioFinal - horarioInicio)
          

            async function buscarHorariosDisponiveis (date, hora, horaValidacao){

                const quadrasDisponiveis = []
                const array = []

                for (let e = 0; e < idQuadra.length; e++) {

                        //Verificando se os ids das quadrasServicos estão agendados para as horas selecionadas. 
                        quadrasDisponiveis.push(await agendamentoModel.findOne({quadra: idQuadra[e], data: date}).select("_id"))
                        const horaAtual = new Date().getHours()
                        const dataAtual = new Date().toLocaleDateString()
                        const dataFront = new Date(data[1]).toLocaleDateString()

                        if(quadrasDisponiveis[e] == null)  {
                            if(horaValidacao > horaAtual || dataAtual < dataFront) {
                                const quadra = await agendamentoModel.findOne({_id: quadraServico[e]}).populate("quadra")
                                const numeroQuadra = quadra.quadra.numero
                                array.push({quadra: numeroQuadra, hora: hora})
                            }
                        }
                }
                return array
            }
            const  promises=[]

            for (let i = 0; i < horasEstabelecidas; i++) {

                // Tratando o formato de data que está vindo do front-end.
                if(horarioInicio + i > 23){
                    horarioInicio = -8
                }

                const dataHorario = data[0]+'/'+data[1]+"/"+(horarioInicio +i);
                promises.push(buscarHorariosDisponiveis(dataHorario, (horarioInicio + i), horarioCalculo + i))
            }

            const p = await Promise.all(promises)
            const horarioDisponiveisQuadras = p.flat()

            res.json({horarioDisponiveisQuadras})
            
        } catch (error) {
            res.json(error)
        }
    },
    
    getQuadrasAgendadas: async (req, res) => {
        try {
            const {idQuadra} = req.body;
            //Pegando todos os agendamentos que tem o idQuadra passado.
            const quadras = await agendamentoModel.find({quadra: idQuadra}).populate("quadra").populate("servico")

            const infoAgendamento = []
            const dadosAgendamentoPrecisos = []
            //Pegando os dados específicos de cada documeto agendamento
            for (let a = 0; a < quadras.length; a++) {
                infoAgendamento.push(await agendamentoModel.findOne({_id: quadras[a]}).populate("quadra").populate("servico").populate("cliente"))
                const agendamento = {
                            /*usuario: {
                                nome: infoAgendamento[a].cliente.nome,
                                email: infoAgendamento[a].cliente.email,
                                telefone: infoAgendamento[a].cliente.telefone
                            },*/
                            quadra: infoAgendamento[a].quadra.numero,
                            modalidade: infoAgendamento[a].servico.modalidade,
                            data: infoAgendamento[a].data,
                            valor: infoAgendamento[a].valor
                        }
                dadosAgendamentoPrecisos.push(agendamento)
            }
            res.status(200).json({dadosAgendamentoPrecisos})

        } catch (error) {
            res.json(error)
        }
    }
}

module.exports = agendamentoController