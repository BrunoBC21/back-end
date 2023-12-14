const {Horario: horarioModel} = require("../models/horario");


const horarioController = {
    create: async (req, res) => {
        try {
            const horario = {
                dias: req.body.dias,
                inicio: req.body.inicio,
                fim: req.body.fim,
            }
            const horarioExistente = await horarioModel.findOne({horario});
            if(horarioExistente) {
                return res.status(201).json({msg: "Horário criado com sucesso!"})
            }
            const resposta = await horarioModel.create(horario);
            res.status(201).json({msg: "Horário criado com sucesso"});

        } catch (error) {
            res.json({error});
        }
    },
    calculoHoraEstabelecimento: async (req, res) => {
        try {
            const horaAtual = new Date().getHours()
            const idHora = await horarioModel.findOne();
            const horaInicial = idHora.inicio;
            let horaFinal = idHora.fim
            if (horaFinal < horaInicial) {
                horaFinal += 24
            }
            if ((horaAtual >= horaInicial) && (horaAtual <= horaFinal)){
                res.status(200).json({msg: true})
            }
            else {
                res.status(200).json({msg: false})
            };
        } catch (error) {
            res.json(error)
        }
    },

    get: async (req, res) => {
        try {
            const horarios = await horarioModel.findOne()
            let horarioInicio = parseInt(horarios.inicio)
            let horarioFinal  = parseInt(horarios.fim)

            if(horarioFinal < horarioInicio) {
                horarioFinal += 24
            }
            const horasEstabelecidas = parseInt(horarioFinal - horarioInicio)
            const array = []

            for (let i = 0; i < horasEstabelecidas; i++) {
                // Tratando o formato de data que está vindo do front-end.
                if(horarioInicio + i > 23){
                    horarioInicio = -8
                }
                const dataHorario = (horarioInicio +i);
                array.push(dataHorario)
            }

            const dias = {
                dia: horarios.dias,
                horas: array
            }
            res.json({dias})

        } catch (error) {
            res.json({error})
        }
    }
}

module.exports = horarioController;