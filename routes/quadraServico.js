const express = require("express");
const router = express.Router();

const quadraServicoController = require("../controllers/quadraServico");

router
    .route("/quadraServico")
    .post((req, res)=> quadraServicoController.create(req, res))

router
    .route("/buscarQuadras")
    .get((req, res)=> quadraServicoController.getAll(req, res));

module.exports = router