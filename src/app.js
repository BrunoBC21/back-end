const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')
app.use(express.json());
app.use(cors())

//db connection
const conection = require("../db/conection.js")

// Routes
const routes = require("../routes/router.js")
app.use('/api',routes)

// escutar a porta 3000
app.listen(port, ()=> {
    console.log("Servidor Rodando!");
});
