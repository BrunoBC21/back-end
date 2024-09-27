const quadraSerice = require("../src/services/quadraService")

const quadraController = {
    create: async (req, res) => {
        try {
            const quadra = {
                numero: req.body.numero,
                foto: req.body.foto
            }
            const response = await quadraSerice.criarQuadra(quadra)
            res.status(response.status).json({msg: response.msg || response.error});

        } catch (error) {
            res.json(error);
        }
    },

    getAll: async (req, res) => {
        try {
            const quadraGet = await quadraSerice.buscarTodasQuadra()
            console.log(quadraGet)
            res.status(quadraGet.status).json({response: quadraGet.msg || quadraGet.error});

        } catch (error) {
            res.json(error)
        }
    },
}

module.exports = quadraController