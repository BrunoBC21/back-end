const {Agendamento: agendamentoModel} = require("../models/agendamento");
const {Servico: servicoModel} = require("../models/servico");
const {Quadra: quadraModel} = require("../models/quadra");
const {QuadraServico: quadraServicoModel} = require("../models/quadraServico");
const {Horario: horarioModel} = require("../models/horario");
const formatoHora = require("../utils/formatoHora");

const agendamentoController = {
    create: async (req, res) => {
        try {
            const { data, transacao, quadra, servico, hora } = req.body;
            const cliente = req.usuario;
            
            const idQuadra = await quadraModel.findOne({ numero: quadra }).select("_id");
            const servicoEncontrado = await servicoModel.findOne({ modalidade: servico }).select("_id preco");
    
            const preco = servicoEncontrado.preco;  // Extraímos o preço aqui
    
            if (hora.length > 1) {
                for (let i = 0; i < hora.length; i++) {
                    const agendamento = {
                        data: data[0],
                        hora: hora[i],
                        valor: preco,  // Usamos o valor de 'preco' aqui
                        transacao: transacao,
                        quadra: idQuadra,
                        cliente: cliente,
                        servico: servicoEncontrado._id
                    };
                    console.log(agendamento);
                    const resposta = await agendamentoModel.create(agendamento);
                }
                res.status(201).json({ msg: "Parabéns, agendamento realizado com sucesso!" });
            } else {
                const agendamento = {
                    data: data[0],
                    hora: hora[0],
                    valor: preco,  // Usamos o valor de 'preco' aqui
                    transacao: transacao,
                    quadra: idQuadra,
                    cliente: cliente,
                    servico: servicoEncontrado._id
                };
                console.log(agendamento);
                const resposta = await agendamentoModel.create(agendamento);
                res.status(201).json({ msg: "Parabéns, agendamento realizado com sucesso!" });
            }
    
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getServicosQuadras: async function(req, res) {
        try {
            const {servico, data} = req.body;
            const horariosFuncionamento = (await formatoHora).arrayHoras
            const horaAtual = new Date().getHours()
            const dataAtual = new Date().toLocaleDateString()
            const numeroQuadra = await quadraModel.find()
            const quadraIds = numeroQuadra.map(q => q.numero);

            const arrayHorasSemFormato = (await formatoHora).arrayHorasSemFormato
     
            console.log(horaAtual)
            if (data >= dataAtual) {
                //pega todos os agendamentos
                const documentosHorariosDisponiveis = await agendamentoModel.find({data: data})
                .populate({
                    path: "servico quadra",
                    match: {modalidade: servico},
                }).then(resultados => resultados.filter(agendamento => agendamento.servico !== null))

                const documentosHorasAgendados = documentosHorariosDisponiveis.map((h)=>{
                    return {hora:  h.hora, quadra: h.quadra.numero}
                })
          
                const promessa = quadraIds.map((numero) => {

                    const horariosDisponiveisParaQuadra = horariosFuncionamento.map((hora, i) => {
                        const agendado = documentosHorasAgendados.some(dado => dado.hora == hora && dado.quadra == numero);
                        
                        if (!agendado && arrayHorasSemFormato[i] > horaAtual) {
                            return hora
                        }
                    })
                    // Remove os valores undefined
                    return horariosDisponiveisParaQuadra.filter(item => item);
                });
                const horarioDisponivel = Array.from(new Set(promessa.flat()))
                res.status(200).json({horas: horarioDisponivel.sort()})
            }
            else{
                res.status(422).json({msg: "Data Inválida!"})
            }
            
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
    },

    clienteAgendamentos: async (req, res) => {
        try {
            const usuario = req.usuario
            const idMeuAgendamento = await agendamentoModel.find({cliente: usuario}).select("_id")

            const meuAgendamento = []
            const dadosAgendamento = []

            for (let i = 0; i < idMeuAgendamento.length; i++) {
                dadosAgendamento.push(await agendamentoModel.findOne({_id: idMeuAgendamento[i]}).populate("servico").populate("quadra"))
                const [semana,ano, mes, dia,hora] = dadosAgendamento[i].data[0].split('/')
                const [,data] = dadosAgendamento[i].data[0].split('/')

                meuAgendamento.push({
                    hora: hora,
                    data: semana+'/'+ano+'/'+mes+'/'+dia,
                    modalidade: dadosAgendamento[i].servico.modalidade,
                    numero: dadosAgendamento[i].quadra.numero,
                    transacao: dadosAgendamento[i].transacao,
                    valor: dadosAgendamento[i].valor
                })
            }
            res.status(200).json({meuAgendamento});

        } catch (error) {
            res.json({error})
        }
    }
}

module.exports = agendamentoController