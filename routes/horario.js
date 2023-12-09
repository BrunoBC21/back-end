const express = require("express");
const router = express.Router();

const horarioController = require("../controllers/horarioController");
const autenticaoPermissao = require("../middlewares/autenticaoPermissao");

router
    .route("/horario")
    .post(autenticaoPermissao, (req, res)=> horarioController.create(req, res))
    .get((req, res)=> horarioController.calculoHoraEstabelecimento(req, res));

module.exports = router