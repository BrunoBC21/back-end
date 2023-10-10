const mongoose = require("mongoose");
const {Schema} = mongoose;

const {servicoSchema} = require("./servico");
const {adminSchema} = require("./admin");
const {quadraSchema} = require("./quadra");

const horarioSchema = new Schema({
    admin: [adminSchema],

    servico: [servicoSchema],

    quadra: [quadraSchema],

    dias: {
        type: [Number],
        required: true
    },

    inicio: {
        type: Date,
        required: true
    },

    fim: {
        type: Date,
        required: true
    },

}, {timestamps: true});

const Horario = mongoose.model("Horario", horarioSchema);

module.exports = {
    Horario,
    horarioSchema
};