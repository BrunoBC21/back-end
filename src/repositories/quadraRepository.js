const {Quadra: quadraModel} = require("../../models/quadra");

const quadraRepository = {
    criarQuadra: async (quadra)=> {
        try {
            await quadraModel.create(quadra)
            return

        } catch (error) {
            return {error: error}
        }

    },
    buscarQuadra: async (quadra)=> {
        try {
            return await quadraModel.findOne(quadra)

        } catch (error) {
            return {error: error}
        }

    },
    buscarTodasQuadra: async ()=> {
        try {
           const response = await quadraModel.find()
           return response

        } catch (error) {
            return {error: error}
        }
    }
}

module.exports = quadraRepository