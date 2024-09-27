const validarCampos = {
    validar: (cliente, res)=> {
        try {
            if (!cliente.nome || !cliente.telefone || !cliente.email || !cliente.senha) {
                return { error: "Todos os campos são obrigatórios" }
            }
        } catch (error) {
           return {error} 
        }

    }
}
module.exports = validarCampos