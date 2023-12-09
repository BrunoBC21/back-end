const express = require("express");
const router = express.Router();

const agendamentoController = require("../controllers/agendamentoController");
const autenticao = require("../middlewares/autenticao");
const autenticaoPermissao = require("../middlewares/autenticaoPermissao");

router
    .route("/agendamento")
    .post((req, res)=> agendamentoController.create(req, res))
    .get(autenticaoPermissao, (req, res)=> agendamentoController.getQuadrasAgendadas(req, res));

router
    .route("/quadras-disponiveis")
    .post((req, res)=> agendamentoController.getServicosQuadras(req, res));

router
    .route("/servico-quadra")
    .post(autenticaoPermissao, (req, res)=> agendamentoController.associarQuadraServico(req, res));

module.exports = router