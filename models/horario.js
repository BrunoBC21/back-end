const mongoose = require("mongoose");
const {Schema} = mongoose;

const horarioSchema = new Schema({
    dias: {
        type: [Number],
        required: true
    },

    inicio: {
        type: Number,
        required: true
    },

    fim: {
        type: Number,
        required: true
    }

}, {timestamps: true});

const Horario = mongoose.model("Horario", horarioSchema);

module.exports = {
    Horario,
    horarioSchema
};