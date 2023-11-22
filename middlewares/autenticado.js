const {verify} = require("jsonwebtoken");

const autenticar = (req, res, next)=> {
    try {
        const cabecalhoAutenticacao = req.headers.authorization;

        if(!cabecalhoAutenticacao) {
            res.status(422).json({msg: "Token ausente!"});
        }
    
        const [, token] = cabecalhoAutenticacao.split(" ");
        const secret = process.env.SECRET;
    
        try {
            const decodificar = verify(token, secret)
            console.log(decodificar);
            
            next();
    
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log(error);
    }

    
}
