const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const {Schema} = mongoose;

const canceladoSchema = new Schema({
    data: {
        type: String,
        required: true
    },
    quadra: {
        type: mongoose.Types.ObjectId,
        ref: "Quadra",
        required: true
    },
    servico: {
        type: mongoose.Types.ObjectId,
        ref: "Servico",
        required: true
    },
    cliente: {
        type: mongoose.Types.ObjectId,
        ref: "Cliente",
        required: true
    },
    motivo: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Cancelado = mongoose.model("Cancelado", canceladoSchema);

module.exports = {
    Cancelado,
    canceladoSchema
}