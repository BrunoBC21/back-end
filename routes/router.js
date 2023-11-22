const express = require("express");
const router = express.Router();

const quadra = require("./quadra");
const servico = require("./servico");
const horario = require("./horario");
const agendamento = require("./agendamento");

router.use("/", horario);

router.use("/", servico);
 
router.use("/", quadra);

router.use("/", agendamento);

module.exports = router;