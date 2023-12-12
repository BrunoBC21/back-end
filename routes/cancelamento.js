const express = require("express");
const router = express.Router();

const cancelamentoController = require("../controllers/cancelamentoController");

router
    .route("/cancelar-agendamento")
    .post((req, res)=> cancelamentoController.create(req, res));

module.exports = router;