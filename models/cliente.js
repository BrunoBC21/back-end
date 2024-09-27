const mongoose = require("mongoose");
const {Schema} = mongoose

const clienteSchema = new Schema ({
    nome: {
        type: String,
        required: true
    },

    telefone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    senha: {
        type: String,
        required: true
    },

    foto: {
        type: String,
        required: false
    },

    status: {
        type: String,
        required: true,
        enum: ["ativo", "inativo"],
        default: "ativo"
    },

    role: {
        type: String,
        required: true,
        enum: ["admin", "user", "owner"],
        default: "user"
    }

}, {timestamps: true});

const Cliente = mongoose.model("Cliente", clienteSchema);

module.exports = {
    Cliente,
    clienteSchema
}