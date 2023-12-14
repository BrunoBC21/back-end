const express = require("express");
const router = express.Router();

const enviar = require("../src/services/email/providorEmail");

router
    .route("/enviar")
    .post((req, res)=> enviar.enviarEmail(req, res));

module.exports = router