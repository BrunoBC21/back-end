const quadraRepository = require("../repositories/quadraRepository")

const quadraSerice = {
    criarQuadra: async (quadra)=> {
        try {
            const response = await quadraRepository.buscarQuadra({numero: quadra.numero})
           
            if (response) {
                return {status: 409, msg: "Número da quadra já existe"}
            }
            else {
                await quadraRepository.criarQuadra(quadra)
                return {status: 201, msg: "Número da quadra criado com sucesso"};
            }

        } catch (error) {
            return {status: 500, error: error};
        }
    },

    buscarTodasQuadra: async ()=> {
        try {
            return {status: 200, msg: await quadraRepository.buscarTodasQuadra()}
           
        } catch (error) {
            return {status: 500, error: error};
        }
    }
}

module.exports = quadraSerice