const {Quadra: quadraModel} = require("../models/quadra");

const quadraController = {
    create: async (req, res) => {
        try {
            const quadra = {
                numero: req.body.numero,
                foto: req.body.foto
            }
            const quadraExistente = await quadraModel.findOne({numero: quadra.numero});
            if (quadraExistente) {
                return res.status(201).json({msg: "Número da quadra criado com sucesso!", quadraExistente});
            }
            const resposta = await quadraModel.create(quadra)
            res.status(201).json({msg: "Número da quadra criado com sucesso"});

        } catch (error) {
            res.json(error);
        }
    },

    getAll: async (req, res) => {
        try {
            const quadraGet = await quadraModel.find();
            res.json({quadraGet});

        } catch (error) {
            res.json(error)
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
            res.json(error)
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
            res.json(error);
        }
    }
}

module.exports = quadraController