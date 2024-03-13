const nodemailer = require("nodemailer");

const provedor = {
    enviarEmail: async (req, res)=> {
        try {
            const {email, nome} = req.body
            const user = "21beachtime21@gmail.com"
            const pass = "oyjxrkqsmrsgmvnz"
            
            const codigoConfirmacao = Math.round(Math.random() * 900000) + 100000
            
            const transporte = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {user, pass},
            })
            const emailContent = `
                <h2>Olá ${nome}!</h2>
                <h3>Por favor, copie o código abaixo cole na aplicação:</h3>
                    <div style="padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; margin-right: 96.3%">
                        ${codigoConfirmacao}
                    </div>
                `;

            transporte.sendMail({
                from: user,
                to: email,
                replyTo: user,
                subject: "Confirmação de e-mail!",
                html:  emailContent
                //text: "Vc e o Breno são gays"
                
            }).then((info)=>{
                res.json({codigoConfirmacao})
            }).catch((error)=>{
                console.log({error})
            })
            
        } catch (error) {
            res.json({error});
        }
    }
}

module.exports = provedor