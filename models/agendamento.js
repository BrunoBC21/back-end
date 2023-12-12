const mongoose = require("mongoose");
const {Schema} = mongoose;

const agendamentoSchema = new Schema({
    data: {
        type: [String],
        required: true,
    },

    valor: {
        type: Number,
        required: false,
    },

    trasacao: {
        type: String,
        required: false,
    },

    horario: {
        type: mongoose.Types.ObjectId,
        ref:  "Horario",
        required: true
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
        enum: ['D', 'A'],
        default: 'D'
    }


}, {timestamps: true});

const Agendamento = mongoose.model("Agendamento", agendamentoSchema);

module.exports = {
    Agendamento,
    agendamentoSchema

};