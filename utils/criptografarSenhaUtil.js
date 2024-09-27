const bcrypt = require('bcrypt');
const criptografarSenha = {
    criptografar: async (senha)=> {
        try {
            const saltRounds = 16; // Você pode definir isso diretamente
            const senhaHash = await bcrypt.hash(senha, saltRounds);
            return senhaHash

        } catch (error) {
            return error
        }
    }
}
module.exports = criptografarSenha