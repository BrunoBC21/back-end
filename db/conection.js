
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect('mongodb+srv://herissonroger3:CkEWaXZyawBf8Qqt@cluster0.kodrryn.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("Conectado ao banco de dados");
    
}).catch((error) =>{
    console.error(error)
})

module.exports = mongoose;
