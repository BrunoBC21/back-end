const mongoose = require("mongoose");
const {Schema} = mongoose;

const quadraServicoSchema = new Schema ({
    quadra: {
        type: mongoose.Types.ObjectId,
        ref: "Quadra",
        required: true
    },
    
    servico: {
        type: mongoose.Types.ObjectId,
        ref: "Servico",
        required: true
    }

}, {timestamps: true});

const QuadraServico = mongoose.model("QuadraServico", quadraServicoSchema);

module.exports = {
    QuadraServico,
    quadraServicoSchema
};
