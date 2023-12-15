
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect('mongodb+srv://brenoramon55:26s2M6yQ3b9NpPUW@cluster0.xsr0gwd.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("Conectado ao banco de dados");
    
}).catch((error) =>{
    console.error(error)
})

module.exports = mongoose;
