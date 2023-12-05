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
        type: Boolean,
        required: false
    },

    role: {
        type: String,
        required: false
    }

}, {timestamps: true});

const Cliente = mongoose.model("Cliente", clienteSchema);

module.exports = {
    Cliente,
    clienteSchema
}