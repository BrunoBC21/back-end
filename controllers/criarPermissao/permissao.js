const {Cliente: ClienteModel} = require("../../models/cliente");

const permisaoController = {

    create: async (req, res)=> {        
        try {
            const {email, tipoUsuario} = req.body

            const id = await ClienteModel.findOne({email: email}).select("_id")

            const topUser = await ClienteModel.updateOne({_id: id}, {role: tipoUsuario});

            res.status(201).json({upUser});

        } catch (error) {
            res.json()
        }
    }
}
module.exports = permisaoController;