const mongoose = require("mongoose");
const {Schema} = mongoose;

const canceladoSchema = new Schema({
    cancelado: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, {timestamps: true});

const Cancelado = mongoose.model("Cancelado", canceladoSchema);

module.exports = {
    Cancelado,
    canceladoSchema
}