//const {verify} = require("jsonwebtoken");
const  jwt = require("jsonwebtoken")

const autenticaoOwner = (req, res, next)=> {

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
                else if (infor.role == "owner"){
                       res.status(200);
                       req.usuario = {usuario: infor.subject}
                       next()
                }
                else {
                    res.status(403).json({msg:"Permissão inválida!", usuario: infor.role});
                }
            });
    
        } catch (error) {
            res.json({msg: error});
        }

    
}
module.exports = autenticaoOwner;