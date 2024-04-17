const mongoose = require("mongoose");
const {Schema} = mongoose;

const horarioSchema = new Schema({
    dia: {
        type: [Number],
        required: true,
    },

    inicio: {
        type: Number,
        required: true
    },

    fim: {
        type: Number,
        required: true
    },

    diaVariavel: {
        type: Date,
        default: null
    },

    inicioVariavel: {
        type: Number,
        default: null
    },
    
    fimVariavel: {
        type: Number,
        default: null
    }

}, {timestamps: true});

const Horario = mongoose.model("Horario", horarioSchema);

module.exports = {
    Horario,
    horarioSchema
};