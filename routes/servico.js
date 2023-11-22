const express =  require("express");
const router = express.Router();

const clienteController = require("../controllers/servico");

router 
    .route("/servico")
    .post((req, res) => clienteController.create(req, res))
    .get((req, res) => clienteController.getAll(req, res));

module.exports = router