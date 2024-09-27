const validarEmailTelefone = {
    validarTelefone: (telefone)=> {
        const validarTelefone = /\(?\d{2}\)?\d{4,5}-?\d{4}/;
        return validarTelefone.test(telefone)
    },

    validarEmail: (email)=> {
        const validarEmail = /\w+@\w+\.\w+/;
        return validarEmail.test(email)
    }
}

module.exports = validarEmailTelefone