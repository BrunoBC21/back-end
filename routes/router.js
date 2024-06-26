const express = require("express");
const router = express.Router();

const quadra = require("./quadra");
const servico = require("./servico");
const horario = require("./horario");
const agendamento = require("./agendamento");
const quadraServico = require("./quadraServico");
const cliente = require("./cliente");
const confirmacaoEmail = require("./enviarEmail");
const cancelar = require("./cancelamento");
const permisao =  require("./permisao.js");
const horarioDiaVariavel = require("./horarioDiaVariavel.js")

router.use('/', cancelar);

router.use('/', confirmacaoEmail)

router.use('/', cliente);

router.use("/", horario);

router.use("/", servico);
 
router.use("/", quadra);

router.use("/", agendamento);

router.use("/", quadraServico);

router.use('/', permisao);

router.use('/', horarioDiaVariavel);

module.exports = router;