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
            const horaFinal = idHora.fim
            if ((horaAtual >= horaInicial) && (horaAtual <= horaFinal)){
                res.status(200).json({msg: true})
                console.log(true)
            }
            else {
                res.status(200).json({msg: false})
                console.log(false)
            };
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = horarioController;