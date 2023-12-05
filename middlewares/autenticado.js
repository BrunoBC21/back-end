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
                    res.json({'Falha na verificação do token:': err});
                } else {
                    //console.log('Token verificado com sucesso:', decoded);
                    next()
                }
            });
    
        } catch (error) {
            console.log({msg: error});
        }

    
}
module.exports = autenticarUsuario;