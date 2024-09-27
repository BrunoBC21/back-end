const clienteRepositery = require("../repositories/clienteRepository");
const criptografarSenhaUtil = require("../../utils/criptografarSenhaUtil")
const validarEmailTelefone = require("../../utils/validarEmailTelefoneUtil")

const clienteService = {
    criarUsuario: async (cliente) => {
        try {
            // Validações de email e telefone
            if (validarEmailTelefone.validarEmail(cliente.email) && validarEmailTelefone.validarTelefone(cliente.telefone) && cliente.telefone.length < 15) {
                const { telefone, email } = cliente;
                
                const user = await clienteRepositery.buscarDadosUsuario({ telefone: telefone, email: email });
                if (user) {
                    return { status: 409, error: "Email e número de telefone já existem no sistema" };
                }

                if (await clienteRepositery.buscarDadosUsuario({ email: email })) {
                    return { status: 409, error: "Email já existe no sistema" };
                }

                if (await clienteRepositery.buscarDadosUsuario({ telefone: telefone })) {
                    return { status: 409, error: "Telefone já existe no sistema" };
                }

                cliente.senha = await criptografarSenhaUtil.criptografar(cliente.senha);
                const response = await clienteRepositery.criarUsuario(cliente);
                return { status: 201, response, msg: "Usuário criado com sucesso!" };
                
            }
            else if ((!validarEmailTelefone.validarTelefone(cliente.telefone) || cliente.telefone.length > 14) && !validarEmailTelefone.validarEmail(cliente.email)) {
                return { status: 400, error: "Email e número de telefone inválidos!" };

            }
            else if (!validarEmailTelefone.validarTelefone(cliente.telefone) || cliente.telefone.length > 14) {
                return { status: 400, error: "Número de telefone inválido!" };

            }
            else if (!validarEmailTelefone.validarEmail(cliente.email)) {
                return { status: 400, error: "Email inválido" };
            }

        } catch (error) {
            return {status: 500, error:"Erro ao criar usuário"}
        }
    },

    todosUsuarios: async ()=> {
        try {
            return {msg: await clienteRepositery.todosUsuarios()}

        } catch (error) {
            return error
        }
    },

    deletarUsuario: async (id)=> {
        await clienteRepositery.delete(id)
        return
    }
};

module.exports = clienteService;
