const express = require("express");
const router = express.Router();

const cancelamentoController = require("../controllers/cancelamentoController");
const autenticacao = require("../middlewares/autenticao");

router
    .route("/cancelar-agendamento")
    .post(autenticacao ,(req, res)=> cancelamentoController.create(req, res))
    .get(autenticacao, (req, res)=> cancelamentoController.mostrarCancelamentos(req,res));

module.exports = router;