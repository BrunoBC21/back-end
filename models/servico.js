const mongoose = require("mongoose");
const {Schema} = mongoose;

const {adminSchema} = require("./admin");

const servicoSchema = new Schema({
    admin: [adminSchema],

    titulo: {
        type: String,
        required: true
    },

    duracao: {
        type: Number,
        required: true
    },

    preco: {
        type: Number,
        required: true
    },

    recorrencia: {
        type: Number,
        required: true
    },

    descricao: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        required: true
    }

}, {timestamps: true});

const Servico = mongoose.model("Servico", servicoSchema);

module.exports = {
    Servico,
    servicoSchema
}