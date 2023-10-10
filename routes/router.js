const router = require("express").Router();
//const router = express.Router()

const clienteRouter = require("./cliente.js")

router.use("/", clienteRouter);

module.exports = router