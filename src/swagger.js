const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Configurações básicas do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentação",
      version: "1.0.0",
      description: "Documentação da API do meu projeto",
    },
    servers: [
      {
        url: "http://localhost:3000", // URL base do servidor
      },
    ],
  },
  apis: ["../routes/router.js"], // Caminho para os arquivos que contêm as rotas da API
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


