
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect('mongodb://127.0.0.1:27017/beac')
.then(()=>{
    console.log("Conectado");
    
})
.catch((error) =>{
    console.error(error)
    
})

// name: cortespolemicos
// 93MNj5UyNUgwwbYk

// mongo online: mongodb+srv://cortespolemicos7:93MNj5UyNUgwwbYk@cluster0.7b8b5rf.mongodb.net/?retryWrites=true&w=majority
module.exports = mongoose;
