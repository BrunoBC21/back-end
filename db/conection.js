
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect('mongodb://127.0.0.1:27017/apresentacao')
.then(()=>{
    console.log("Conectado ao banco de dados");
    
}).catch((error) =>{
    console.log(error)
})

module.exports = mongoose;
