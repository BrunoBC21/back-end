const express =  require("express");
const router = express.Router();

const clienteController = require("../controllers/servico");
const autenticaoPermissao = require("../middlewares/autenticaoPermissao");

router 
    .route("/servico")
    .post(autenticaoPermissao, (req, res) => clienteController.create(req, res))
    .get((req, res) => clienteController.getAll(req, res));

module.exports = router