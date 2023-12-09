const express = require("express");
const router = express.Router();

const horarioController = require("../controllers/horarioController");

router
    .route("/horario")
    .post((req, res)=> horarioController.create(req, res))
    .get((req, res)=> horarioController.calculoHoraEstabelecimento(req, res));

module.exports = router