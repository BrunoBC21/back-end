// Importações
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors')
const jwt =  require('jsonwebtoken')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

require('dotenv').config()

app.use(express.json());
app.use(cors({credentials: true, origin: "*"}))


const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API Information',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./routes/*.js'], // caminho para seus arquivos de rota
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//db connection
const conection = require("../db/conection.js")

// Routes
const routes = require("../routes/router.js")
app.use('/api',routes)

// escutar a porta 3000
app.listen(port, ()=> {
    console.log("Servidor Rodando!");
});
