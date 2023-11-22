const {QuadraServico: quadraServicoModel} = require("../models/quadra_servico");

const quadraServicoController = {
    create: async (req, res) => {
        try {
            const quadraServico = {
                quadra: req.body.quadra,
                servico: req.body.servico,
                status: req.body.status
            }
            const response = await quadraServicoModel.create(quadraServico);
            res.status(201).json({response, msg: "Serviço criado com sucesso!"});

        } catch (error) {
            console.log(error);
        }
    },

    getAll: async (req, res) => {
        try {
            if(req.body.servico == 1) {
               const quadraGet = await quadraServicoModel.findOne({id:"6547e880443d7a2679c42cc6"}).populate("quadra").populate("servico");
               const status = quadraGet.servico.status = false;
               await quadraServicoModel.updateOne({status})
               const quadra = quadraGet.quadra.numero;
               //const status = quadraGet.status;
               res.json({quadraGet});
            }        

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

//module.exports = quadraServicoController