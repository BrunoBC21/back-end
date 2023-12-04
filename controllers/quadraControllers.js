const {Quadra: quadraModel} = require("../models/quadra");

const quadraController = {
    create: async (req, res) => {
        try {
            const quadra = {
                numero: req.body.numero,
                //foto: req.body.foto
            }
            const response = await quadraModel.create(quadra)
            res.status(201).json({response, msg: "Serviço criado com sucesso!"});

        } catch (error) {
            console.log(error);
        }
    },

    getAll: async (req, res) => {
        try {
            const quadraGet = await quadraModel.find();
            res.json({quadraGet});

        } catch (error) {
            console.error(error)
        }
    },

    delete: async (req, res) => {
        try {
            const numero = req.body.numero;
            const quadra = await quadraModel.findOne({numero});

            if (!quadra) {
                res.json({msg: "Quadra não existe"});
                return
            }
            const quadraDelete = await quadraModel.deleteOne({numero})

            res.status(204).json({msg: "Quadra deletada com sucesso", quadraDelete});
            

        } catch (error) {
            console.log(error)
        }
       
    },
    update: async (req, res) => {
        try {
            const quadra = {
                numero: req.body.numero,
                foto: req.body.foto
            }
            
            const response = await quadraModel.updateOne(quadra);
            res.status(200).json({response, msg: "Serviço atualizado com sucesso!"});

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = quadraController