const {Horario: horarioModel} = require("../models/horario");
const {HorarioDiaVariavel: HorarioDiaVariavelModel} = require("../models/horarioDiaVariavel");
const horarioDiaVariavelController = require("./horarioDiaVariavel/horarioDiaVariavelController");

const horarioController = {
    create: async (req, res) => {
        try {
            const horario = {dia, inicio, fim} = req.body
            const horarioExistente = await horarioModel.findOne({horario});

            if(horarioExistente) {
                return res.status(201).json({msg: "Horários já existem!"})
            }

            for (let i = 0; i < horario.dia.length; i++) {
                await horarioModel.create({dia: horario.dia[i], inicio: horario.inicio, fim: horario.fim});   
            }
            res.status(201).json({msg: "Horário criado com sucesso"});

        } catch (error) {
            res.json({error});
        }
    },

    calculoHoraEstabelecimento: async function (req, res) {
        try {
            await this.restaurarHorarioPadrao();
            const horaAtual = new Date().getHours()
            const diaSemana = new Date().getDay()

            const idHora = await horarioModel.findOne();
            const horaInicial = idHora.inicio;
            let horaFinal = idHora.fim
            const horarioDiaVariavel = await horarioModel.find();

            if (horaFinal < horaInicial) {
                horaFinal += 24
            }

            //Verificando se os dias variáveis estão ativos, se sim, aí é verificado se o estabelecimento está aberto de acordo com o dia variável.
            if (horarioDiaVariavel[diaSemana].inicioVariavel != null) {

                if ((horaAtual >= horarioDiaVariavel[diaSemana].inicioVariavel) && (horaAtual < horarioDiaVariavel[diaSemana].fimVariavel)) {
                    return res.status(200).json({msg: true, horaInicio: horarioDiaVariavel[diaSemana].inicioVariavel, horaFim: horarioDiaVariavel[diaSemana].fimVariavel})
                }

                else {
                    return res.status(200).json({msg: false, horaInicio: horarioDiaVariavel[diaSemana].inicioVariavel, horaFim: horarioDiaVariavel[diaSemana].fimVariavel})
                }
            }

            // Verificando se o estabelecimento está aberto no horário padrão que foi definido.
            if ((horaAtual >= horaInicial) && (horaAtual < horaFinal)){
                return res.status(200).json({msg: true, horaInicio: horaInicial, horaFim: idHora.fim})
            }

            else {
                return res.status(200).json({msg: false, horaInicio: horaInicial, horaFim: idHora.fim})
            };

        } catch (error) {
            res.json(error)
        }
    },

    get: async (req, res) => {
        try {
            const moment = require("moment")
            const data = new Date()
            const dataAtual = new Date(data.getFullYear(), data.getMonth(), data.getDate());
            const diaSemana = new Date().getDay();

            const horarios = await horarioModel.find();
            const estabelecimento = []

            horarios.forEach(element=>{
                let abertura, fechamento;

                if (element.diaVariavel != null) {
                    abertura = element.inicioVariavel;
                    fechamento = element.fimVariavel;

                } else {
                    abertura = element.inicio;
                    fechamento = element.fim;
                }

                let horaFechamento
                abertura > fechamento ? horaFechamento = moment(fechamento, 'HH').add(1, 'day') : horaFechamento = moment(fechamento, 'HH');
                const horaAbertura = moment(abertura, 'HH');

                const periodoFuncionamento = horaFechamento.diff(horaAbertura, 'hours');
                let arrayPeriodoFuncionamento = [];
                
                for (let i = 0; i < periodoFuncionamento; i++) {
                    arrayPeriodoFuncionamento.push(abertura + i)

                        //Verificando se há alguma hora maior que 23h, se sim ela será convertida
                    if (arrayPeriodoFuncionamento[i] > 23) {
                        arrayPeriodoFuncionamento[i] = arrayPeriodoFuncionamento[i] - 24
                    }
                }
                estabelecimento.push(arrayPeriodoFuncionamento)
                
                console.log(arrayPeriodoFuncionamento)

                
            });
            res.json({horas: estabelecimento})

        } catch (error) {
            res.json({error})
        }
    },

    alterarHorario: async (req, res)=> {
        try {
            const {dia, inicio, fim, data} = req.body

            // Iterar sobre o dia que serão atualizados os horários
            const horariosAtualizados = await Promise.all(dia.map(async (element, i)=>{
                if(inicio.length < 2){
                    return await horarioModel.findOneAndUpdate({dia: dia[i]}, {diaVariavel: data[0], inicioVariavel: inicio[0], fimVariavel: fim[0]});
                }

                else {
                    return await horarioModel.findOneAndUpdate({dia: dia[i]}, {diaVariavel: data[i], inicioVariavel: inicio[i], fimVariavel: fim[i]});
                }
            }));

            res.status(200).json({msg:"Dados atualizados com sucesso!"});

        } catch (error) {
            res.json({error})
        }
    },

    restaurarHorarioPadrao: async ()=> {
        try {
            const data = new Date()
            const dataAtual = new Date(data.getFullYear(), data.getMonth(), data.getDate());
            const documentos = await horarioModel.find();
            const diaSemana = new Date().getDay();

            documentos.forEach(async (documento) => {
                //  if (dataAtual > documento.diaVariavel) {
                //      await horarioModel.findOneAndUpdate({dia:documento.dia}, {diaVariavel: null, inicioVariavel: null, fimVariavel: null});
                //  }
                // Horário atual
                    let agora = new Date().setHours(10,0,0,0)

                    // Horário de 1h da manhã
                    let umaDaManha = new Date();
                    umaDaManha.setHours(1, 0, 0, 0); // Define a hora para 1h da manhã

                    // Calcula a diferença em horas
                    let diferencaEmMilissegundos = umaDaManha - agora;
                    let diferencaEmHoras = diferencaEmMilissegundos / (1000 * 60 * 60); // Convertendo milissegundos para horas

                    console.log('Diferença em horas:', diferencaEmHoras);

               
            });
            return

        } catch (error) {
            console.log({error})
        }
    }
}

module.exports = horarioController;