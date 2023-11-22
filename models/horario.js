const mongoose = require("mongoose");
const {Schema} = mongoose;

const horarioSchema = new Schema({
    dias: {
        type: [Number],
        required: true
    },

    inicio: {
        type: String,
        required: true
    },

    fim: {
        type: String,
        required: true
    }

}, {timestamps: true});

const Horario = mongoose.model("Horario", horarioSchema);

module.exports = {
    Horario,
    horarioSchema
};