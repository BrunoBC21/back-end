const {Cliente: ClienteModel, Cliente} = require("../../models/cliente");

const clienteRepository = {
    criarUsuario: async (cliente)=> {
        try {
            ClienteModel.create(cliente)
            return

        } catch (error) {
            return {error: error}
        }

    },
    
    buscarDadosUsuario: async (valor)=> {
        try {
            return ClienteModel.findOne(valor)
    
        } catch (error) {
            return {error: error}
        }

    },

    atualizarUsuario: async (id, cliente)=> {
        try {
            const updateCliente = await ClienteModel.findByIdAndUpdate(id, cliente);
            return {msg: "Dados atualizados!"}

        } catch (error) {
            return {error: error}
        }

    },

    delete: async (id)=> {
        try {
            ClienteModel.updateOne({_id: id}, {status: "inativo"})
            return
            
        } catch (error) {
            return {error: error}
        }

    },
    todosUsuarios: async ()=> {
        try {
            return await ClienteModel.find();

        } catch (error) {
            return error
        }
    }
}
module.exports = clienteRepository