//const {verify} = require("jsonwebtoken");
const  jwt = require("jsonwebtoken")

const autenticarUsuario = (req, res, next)=> {

        //const{authorization} = req.headers
        const cabecalhoAutenticacao = req.headers.authorization;

        if(!cabecalhoAutenticacao) {
            return res.json({msg: "Token ausente!"});
        }
    
        const [, token] = cabecalhoAutenticacao.split(" ");
        const secret = process.env.SECRET;
        try {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    res.status(401).json("Token expirou");
                } else {
                    res.status(200);
                    next()
                }
            });
    
        } catch (error) {
            console.log({msg: error});
        }

    
}
module.exports = autenticarUsuario;