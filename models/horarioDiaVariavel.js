const mongoose = require("mongoose");
const {Schema} = mongoose;

const horarioDiaVariavelSchema = new Schema({
    dia: {
        type: Number,
        required: true
    },

    inicio: {
        type: Number,
        required: true
    },

    fim: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const HorarioDiaVariavel = mongoose.model("HorarioDiaVariavel", horarioDiaVariavelSchema);

module.exports = {HorarioDiaVariavel, horarioDiaVariavelSchema};