const mongoose = require("mongoose");
const {Schema} = mongoose;

const {clienteSchema} = require("./cliente");
const {quadraSchema} = require("./quadra");

const estabClienteSchema = new Schema({
    quadra: [quadraSchema],

    cliente: [clienteSchema],

    status: {
        type: Boolean,
        required: true
    }

}, {timestamps: true});

const EstabCliente = mongoose.model("EstabCliente", estabClienteSchema);

module.exports = EstabCliente;