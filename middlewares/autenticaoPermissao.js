//const {verify} = require("jsonwebtoken");
const  jwt = require("jsonwebtoken")

const autenticaoPermissao = (req, res, next)=> {

        //const{authorization} = req.headers
        const cabecalhoAutenticacao = req.headers.authorization;

        if(!cabecalhoAutenticacao) {
            return res.json({msg: "Token ausente!"});
        }
    
        const [, token] = cabecalhoAutenticacao.split(" ");
        const secret = process.env.SECRET;
        try {
            jwt.verify(token, secret, (err, infor) => {
                if (err) {
                    res.status(401).json("Token expirou");
                } 
                else if (infor.role == "user"){
                       res.status(200);
                       next()
                }
                else {
                    res.status(403).json("Permissão inválida!");
                }
            });
    
        } catch (error) {
            res.json({msg: error});
        }

    
}
module.exports = autenticaoPermissao;