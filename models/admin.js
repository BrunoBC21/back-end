const mongoose = require("mongoose");

const {Schema} = mongoose;

const adminSchema = new Schema({
    nome: {
        type: String,
        required: true
    },

    senha: {
        type: String,
        require: true 
    }

}, {timestamps: true});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = {
    Admin,
    adminSchema
};