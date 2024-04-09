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

            const resposta = await horarioModel.create({dia: horario.dia, inicio: horario.inicio, fim: horario.fim});
            horarioDiaVariavelController.create();
        
            res.status(201).json({msg: "Horário criado com sucesso"});

        } catch (error) {
            res.json({error});
        }
    },

    calculoHoraEstabelecimento: async (req, res) => {
        try {
            const horaAtual = new Date().getHours()
            const diaSemana = new Date().getDay()

            const idHora = await horarioModel.findOne();
            const horaInicial = idHora.inicio;
            let horaFinal = idHora.fim

            const horarioDiaVariavel = await HorarioDiaVariavelModel.find();

            if (horaFinal < horaInicial) {
                horaFinal += 24
            }


            //Verificando se os dias variáveis estão ativos, se sim, aí é verificado se o estabelecimento está aberto de acordo com o dia variável.
            for (let i = 0; i < horarioDiaVariavel.length; i++) {
                if (horarioDiaVariavel[i].dia == diaSemana && horarioDiaVariavel[i].status == true) {
                    if ((horaAtual >= horarioDiaVariavel[i].inicio) && (horaAtual < horarioDiaVariavel[i].fim)) {
                        return res.status(200).json({msg: true, horaInicio: horarioDiaVariavel[i].inicio, horaFim: horarioDiaVariavel[i].fim})
                    }
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
            let horarioInicio = []
            let horarioFinal = []
            const horasEstabelecidas =[]
            const array = []
            const dias = {}

            const horarios = await horarioModel.find();
            for (let i = 0; i < horarios.length; i++) {
                horarioInicio = parseInt(horarios[i].inicio)
                horarioFinal  = parseInt(horarios[i].fim)    
    
                if(horarioFinal[i] < horarioInicio[i]) {
                    horarioFinal[i] += 24
                }
                horasEstabelecidas.push(parseInt(horarioFinal[i] - horarioInicio[i]))

                for (let i = 0; i < horasEstabelecidas[i]; i++) {
                    // Tratando o formato de data que está vindo do front-end.
                    if(horarioInicio[i] + i > 23){
                        horarioInicio[i] = -8
                    }
                    const dataHorario = (horarioInicio[i] +i);
                    array.push(dataHorario)
                }

                dias = {
                    dia: horarios.dia,
                    horas: array
                }
    
            }

            res.json({dias})

        } catch (error) {
            res.json({error})
        }
    }
}

module.exports = horarioController;