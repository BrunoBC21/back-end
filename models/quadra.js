const mongoose = require("mongoose");
const {Schema} = mongoose;

const quadraSchema = new Schema({
    numero: {
        type: Number,
        required: true
    },

    foto: {
        type: String,
        required: false
    }
});

const Quadra = mongoose.model("Quadra", quadraSchema);

module.exports = {
    Quadra,
    quadraSchema
}