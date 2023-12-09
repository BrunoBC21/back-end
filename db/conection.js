
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect('mongodb://127.0.0.1:27017/bancoBc')
.then(()=>{
    console.log("Conectado ao banco de dados");
    
}).catch((error) =>{
    console.error(error)
})

module.exports = mongoose;
