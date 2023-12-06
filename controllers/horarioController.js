const {Horario: horarioModel} = require("../models/horario");


const horarioController = {
    create: async (req, res) => {
        try {
            const horario = {
                dias: req.body.dias,
                inicio: req.body.inicio,
                fim: req.body.fim,
            }
            const horarioExistente = await horarioModel.findOne(horario);
            if(horarioExistente) {
                return res.status(201).json({msg: "Horário criado com sucesso!"})
            }
            const resposta = await horarioModel.create(horario);
            res.status(201).json({msg: "Horário criado com sucesso"});

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = horarioController;