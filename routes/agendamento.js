const express = require("express");
const router = express.Router();

const agendamentoController = require("../controllers/agendamentoController");

router
    .route("/agendamento")
    .post((req, res)=> agendamentoController.create(req, res))
    .get((req, res)=> agendamentoController.getAll(req, res));

router
    .route("/servicoquadra")
    .post((req, res)=> agendamentoController.getServicosQuadras(req, res));

module.exports = router