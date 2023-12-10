const nodemailer = require("nodemailer");

const provedor = {
    enviarEmail: async (req, res)=> {
        try {
            const user = "21beachtime21@gmail.com"
            const pass = "gWJ7kmsEIyYAMcnV"

            const transporte = nodemailer.createTransport({
                host: "smtp-relay.brevo.com",
                port: 587,
                auth: {user, pass},
            })
            const emailContent = `
  <p>Olá ${user.email}!</p>
  <p>Clique no botão abaixo para confirmar seu cadastro:</p>
  <a href="http://seusite.com/confirmar/${user.confirmationCode}">
    <button style="padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px;">
      Confirmar Cadastro
    </button>
  </a>
`;

            transporte.sendMail({
                from: user,
                to: "herissonroger3@gmail.com",
                replyTo: user,
                subject: "Olá, Herisson viado!",
                html:  emailContent
                //text: "Vc e o Breno são gays"

            }).then((info)=>{
                res.json({msg:info })

            }).catch((error)=>{
                res.json({error})
            })

        } catch (error) {
            res.json({error});
        }
    }
}

module.exports = provedor