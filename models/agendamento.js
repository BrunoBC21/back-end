const mongoose = require("mongoose");
const {Schema} = mongoose;

const agendamentoSchema = new Schema({
    data: {
        type: String,
        required: true,
    },
    hora: {
        type: String,
        required: true
    },

    valor: {
        type: Number,
        required: false,
    },

    transacao: {
        type: String,
        required: false,
    },

    horario: {
        type: mongoose.Types.ObjectId,
        ref:  "Horario",
        required: false
    },

    quadra: {
        type: mongoose.Types.ObjectId,
        ref: "Quadra",
        required: true,
    },

    cliente: {
        type: mongoose.Types.ObjectId,
        ref: "Cliente",
        required: false,
    },

    servico: {
        type: mongoose.Types.ObjectId,
        ref: "Servico",
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['disponivel', 'agendado', 'cancelado'],
        default: 'agendado'
    }


}, {timestamps: true});

const Agendamento = mongoose.model("Agendamento", agendamentoSchema);

module.exports = {
    Agendamento,
    agendamentoSchema

};