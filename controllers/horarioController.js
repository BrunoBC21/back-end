const {Horario: horarioModel} = require("../models/horario");


const horarioController = {
    create: async (req, res) => {
        try {
            const horario = {
                dias: req.body.dias,
                inicio: req.body.inicio,
                fim: req.body.fim,
            }
            const response = await horarioModel.create(horario);
            res.status(200).json({msg: "Servico criado com sucesso"+ response});

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = horarioController;