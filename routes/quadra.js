const express = require("express")
const router = express.Router()

const quadraController = require("../controllers/quadraControllers")

router
    .route("/quadra")
    .post((req, res) => quadraController.create(req, res));

router
    .route("/quadra")
    .get((req, res) => quadraController.getAll(req, res));

router
    .route("/quadra/:id")
    .get((req, res) => quadraController.getDados(req, res));

router
    .route("/quadra")
    .delete((req, res) => quadraController.delete(req, res));

router
    .route("/cliente")
    .put((req, res) => quadraController.update(req, res));
      

module.exports = router