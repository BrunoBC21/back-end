const mongoose = require("mongoose");
const {Schema} = mongoose;

const {quadraSchema} = require("./quadra");
const {adminSchema} = require("./admin");

const estabQuadraSchema = new Schema({
    admin: [adminSchema],
    quadra: [quadraSchema],

    status: {
        type: Boolean,
        required: true
    }

}, {timestamps: true});

const EstabQuadra = mongoose.model("EstabQuadra", estabQuadraSchema);

module.exports = EstabQuadra;