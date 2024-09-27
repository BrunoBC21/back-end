const express = require("express");
const router = express.Router();

const agendamentoController = require("../controllers/agendamentoController");
const autenticaoUser = require("../middlewares/autenticaoUser");
const autenticaoAdmin = require("../middlewares/autenticaoAdmin");



router
    .route("/agendar")
    .post((req, res)=> agendamentoController.create(req, res))
    .get(autenticaoAdmin, (req, res)=> agendamentoController.getQuadrasAgendadas(req, res));

router
    .route("/quadras-disponiveis")
    .post((req, res)=> agendamentoController.getServicosQuadras(req, res));

router
    .route("/servico-quadra")
    .post((req, res)=> agendamentoController.associarQuadraServico(req, res));

router
    .route("/meus-agendamentos")
    .post(autenticaoUser, (req, res)=> agendamentoController.clienteAgendamentos(req, res));

module.exports = router