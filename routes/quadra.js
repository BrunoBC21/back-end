/*const express = require("express")
const router = express.Router()

const quadraController = require("../controllers/quadraControllers");
const clienteController = require("../controllers/clienteControllers");

router
    .route("/cliente")
    .post((req, res) => quadraController.create(req, res));

router
    .route("/cliente")
    .get((req, res) => quadraController.getAll(req, res));

router
    .route("/cliente/:id")
    .get((req, res) => clienteController.getDados(req, res));

router
    .route("/cliente/:id")
    .delete((req, res) => clienteController.delete(req, res));

router
    .route("/cliente/:id")
    .put((req, res) => clienteController.update(req, res))
      

module.exports = router*/