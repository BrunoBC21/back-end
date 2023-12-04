const express = require("express");
const router = express.Router();

const agendamentoController = require("../controllers/agendamentoController");
const autenticao = require("../middlewares/autenticado");

router
    .route("/agendamento")
    .post((req, res)=> agendamentoController.create(req, res))
    .get(autenticao, (req, res)=> agendamentoController.getQuadras(req, res));

router
    .route("/quadras-disponiveis")
    .post(autenticao, (req, res)=> agendamentoController.getServicosQuadras(req, res));

router
    .route("/servico-quadra")
    .post((req, res)=> agendamentoController.associarQuadraServico(req, res));

module.exports = router