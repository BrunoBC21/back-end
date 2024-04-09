const express = require("express");
const router = express.Router();

const horarioDiaVariavelController = require("../controllers/horarioDiaVariavel/horarioDiaVariavelController");

router
    .route("/horario-variavel")
    .post((req, res)=> horarioDiaVariavelController.alterarHorarioDia(req, res));

module.exports = router