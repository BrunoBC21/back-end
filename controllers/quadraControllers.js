const quadraModel = require("../models/quadra");

const quadraController = {
    create: async (req, res) => {
        try {
            const quadra = {
                numero: req.body.numero,
                foto: req.body.foto
            }
            const response = await quadraModel.create(quadraController)

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = quadraController