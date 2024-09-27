const quadraRepository = {
    criarQuadra: async (quadra) => {
        try {
            if (!quadra.numero) {
                throw new Error('Número da quadra inválido'); // Lançar erro
            }
            await quadraModel.create(quadra);
            return { id: 1, numero: quadra.numero };
        } catch (error) {
            throw new Error(error.message); // Lançar erro
        }
    },
    buscarQuadra: async (quadra) => {
        try {
            return await quadraModel.findOne(quadra);
        } catch (error) {
            throw new Error('Erro ao buscar quadra'); // Lançar erro
        }
    },
    buscarTodasQuadra: async () => {
        try {
            return await quadraModel.find();
        } catch (error) {
            throw new Error('Erro ao buscar todas as quadras'); // Lançar erro
        }
    }
};

module.exports = quadraRepository;
