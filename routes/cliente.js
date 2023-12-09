const express = require("express")
const router = express.Router()

const clienteController = require("../controllers/clienteControllers")
const autenticao = require("../middlewares/autenticao");
const autenticaoPermissao = require("../middlewares/autenticaoPermissao");

router
    .route("/cliente")
    .post((req, res) => clienteController.create(req, res));

router
    .route("/cliente")
    .get((req, res) => clienteController.getAll(req, res));

router
    .route("/cliente/:id")
    .get((req, res) => clienteController.getDados(req, res));

router
    .route("/cliente/:id")
    .delete((req, res) => clienteController.delete(req, res));

router
    .route("/cliente/:id")
    .put((req, res) => clienteController.update(req, res));

router
    .route("/login")
    .post((req, res)=> clienteController.login(req, res))

module.exports = router