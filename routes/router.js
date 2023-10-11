const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteControllers");

router.route("/cliente")
  .post(clienteController.create)
  .get(clienteController.getAll);

router.route("/cliente/:id")
  .get(clienteController.getDados)
  .delete(clienteController.delete)
  .put(clienteController.update);

router.route("/login").post(clienteController.login);

module.exports = router;