const express = require("express");
const router = express.Router();

const horarioController = require("../controllers/horarioController");
const autenticaoPermissao = require("../middlewares/autenticaoPermissao");

router
    .route("/horario")
    .post((req, res)=> horarioController.create(req, res))
    .get((req, res)=> horarioController.calculoHoraEstabelecimento(req, res));

router
    .route("/horario-cadastrado")
    .get((req, res)=> horarioController.get(req, res));

module.exports = router