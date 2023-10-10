const mongoose = require("mongoose");
const {Schema} = mongoose;

const {quadraSchema} = require("./quadra");
const {servicoSchema} = require("./servico");

const quadraServicoSchema = new Schema({
    quadra: [quadraSchema],

    servico: [servicoSchema],

    status: {
        type: Boolean,
        required: true
    }
    
}, {timestamps: true});

const QuadraServico = mongoose.model("QuadraServico", quadraServicoSchema);

module.exports = {
    QuadraServico,
    quadraServicoSchema
}