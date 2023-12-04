const express = require("express");
const router = express.Router();

const quadra = require("./quadra");
const servico = require("./servico");
const horario = require("./horario");
const agendamento = require("./agendamento");
const quadraServico = require("./quadraServico");
const cliente = require("./cliente");

router.use('/', cliente);

router.use("/", horario);

router.use("/", servico);
 
router.use("/", quadra);

router.use("/", agendamento);

router.use("/", quadraServico)

module.exports = router;