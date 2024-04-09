const express = require("express");
const router = express.Router();

const cancelamentoController = require("../controllers/cancelamentoController");
const autenticaoUser = require("../middlewares/autenticaoUser");

router
    .route("/cancelar-agendamento")
    .post(autenticaoUser ,(req, res)=> cancelamentoController.create(req, res))
    .get(autenticaoUser, (req, res)=> cancelamentoController.mostrarCancelamentos(req,res));

module.exports = router;