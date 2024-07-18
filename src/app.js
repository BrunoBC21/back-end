// Importações
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors')
const jwt =  require('jsonwebtoken')
require('dotenv').config()

app.use(express.json());
app.use(cors({credentials: true, origin: "*"}))

//db connection
const conection = require("../db/conection.js")

// Routes
const routes = require("../routes/router.js")
app.use('/api',routes)

// escutar a porta 3000
app.listen(port, ()=> {
    console.log("Servidor Rodando!");
});
