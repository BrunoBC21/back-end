const mongoose = require("mongoose");
const {Schema} = mongoose;

const {clienteSchema} = require("./cliente");
const {adminSchema} = require("./admin");
const {quadraSchema} = require("./quadra");
const {servicoSchema} = require("./servico")

const agendamentoSchema = new Schema({
    cliente: [clienteSchema],

    admin: [adminSchema],

    servico: [servicoSchema],

    quadra: [quadraSchema],

    valor: {
        type: Number,
        required: true
    },

    trasacao: {
        type: String,
        required: true
    }

}, {timestamps: true});

const Agendamento = mongoose.model("Agendamento", agendamentoSchema);

module.exports = {
    Agendamento,
    agendamentoSchema

};