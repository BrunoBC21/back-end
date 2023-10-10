const mongoose = require("mongoose");
const {Schema} = mongoose

const clienteSchema = new Schema ({
    nome: {
        type: String,
        required: true
    },

    telefone: {
        type: String,
        required: false
    },

    email: {
        type: String,
        required: true
    },

    senha: {
        type: String,
        required: false
    },

    foto: {
        type: String,
        required: false
    },

    status: {
        type: Boolean,
        required: false
    },


}, {timestamps: true});

const Cliente = mongoose.model("Cliente", clienteSchema);

module.exports = {
    Cliente,
    clienteSchema
}