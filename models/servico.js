const mongoose = require("mongoose");
const {Schema} = mongoose;

const servicoSchema = new Schema({
    modalidade: {
        type: String,
        required: true
    },

    preco: {
        type: String,
        required: true
    },

    recorrencia: {
        type: Number,
        required: false
    },

    descricao: {
        type: String,
        required: false
    },

    status: {
        type: String,
        required: true,
        enum: ['A', 'I'],
        default: 'A'
    }

}, {timestamps: true});

const Servico = mongoose.model("Servico", servicoSchema);

module.exports = {
    Servico,
    servicoSchema
}