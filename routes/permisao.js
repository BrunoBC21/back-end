const express = require("express");
const router = express.Router()

const  permisaoController = require("../controllers/criarPermissao/permissao");
const  autenticaoPermisao = require("../middlewares/autenticacaoOwner");

router
    .route("/privilegio-cliente")
    .post(autenticaoPermisao, (req, res)=> permisaoController.create(req, res));
    
module.exports = router