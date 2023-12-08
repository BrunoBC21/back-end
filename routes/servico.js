const express =  require("express");
const router = express.Router();

const clienteController = require("../controllers/servico");
const autenticao = require("../middlewares/autenticao");

router 
    .route("/servico")
    .post((req, res) => clienteController.create(req, res))
    .get(autenticao, (req, res) => clienteController.getAll(req, res));

module.exports = router