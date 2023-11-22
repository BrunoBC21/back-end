const { Collection } = require("mongoose");
const {Agendamento: agendamentoModel} = require("../models/agendamento");
const {Servico: servicoModel} = require("../models/servico");

const agendamentoController = {
    create: async (req, res) => {
        try {
            const agendamento = {
                data: req.body.data,
                //valor: req.body.valor,
                //trasacao: req.body.trasacao,
                horario: req.body.horario,
                quadra: req.body.quadra,
                //cliente: req.body.cliente,
                servico: req.body.servico,
            }

            const response = await agendamentoModel.create(agendamento);
            res.status(200).json({response})

        } catch (error) {
            console.log(error)
        }
    },

    getAll: async (req, res) => {
        try {
            const quadras = await agendamentoModel.find({status: 'D'}).populate("servico")
            if (quadras) {
                res.json({quadras})
            }
    
            
            //const deleteCliente = await agendamentoModel.findByIdAndDelete("655a424bb0ba1eab7d0ff87c");
            /*if(req.body.servico == 1) {
               const quadraGet = await agendamentoModel.findOne({id:"6547e880443d7a2679c42cc6"}).populate("quadra").populate("servico");
               const status = quadraGet.servico.status = false;
               await quadraServicoModel.updateOne({status})
               const quadra = quadraGet.quadra.numero;
               //const status = quadraGet.status;
               res.json({quadraGet});
            }*/        

        } catch (error) {
            console.error(error)
        }
    },
    getServicosQuadras: async (req, res) => {
        try {
            const {servico, data} = req.body;
            const idServico = await servicoModel.find({modalidade: servico}).select("_id");
            diasDisponiveis(servico, data)

            async function diasDisponiveis(servico, data) {
                // Dias para verificação
                const a = data[0]+'-'+data[1]+'-'+data[2]
                const date = new Date();

                const verificarDate = (date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear())
                if(data[1] == verificarDate || data[1] > verificarDate){
                    const quatroH = data[0]+'-'+data[1]+"-16"
                    const cincoH = data[0]+'-'+data[1]+"-17"
                    const seiH = data[0]+'-'+data[1]+"-18"
                    const seteH = data[0]+'-'+data[1]+"-19"
                    const oitoH = data[0]+'-'+data[1]+"-20"
                    const noveH = data[0]+'-'+data[1]+"-21"
                    const dezH = data[0]+'-'+data[1]+"-22"

                    //const servicod = await agendamentoModel.find({"servico":idServico, $or:[{data: quatroH}, {data: cincoH}], status: 'C'}).populate("servico")
                    //res.json({servicod})
                    const array = []
                    let tt
                    if(tt = await agendamentoModel.find({servico: idServico, data: quatroH}).select("_id")) {
                        ass = await agendamentoModel.findById(tt)
                        if(ass == null) {
                            array.push()
                        }
                    }

                    if (tt = await agendamentoModel.find({servico: idServico, data: cincoH}).select("_id")) {
                        ass = await agendamentoModel.findById(tt)
                        if(ass == null){
                            array.push(cincoH)
                        }
                    }

                    if (tt = await agendamentoModel.find({servico: idServico, data: seiH}).select("_id")) {
                        ass = await agendamentoModel.findById(tt)
                        if(ass == null){
                            array.push(seiH)
                        }
                    }

                    if (tt = await agendamentoModel.find({servico: idServico, data: seteH}).select("_id")) {
                        ass = await agendamentoModel.findById(tt)
                        if(ass == null){
                            array.push(seteH)
                        }
                    }  

                    if (tt = await agendamentoModel.find({servico: idServico, data: oitoH}).select("_id")) {
                        ass = await agendamentoModel.findById(tt)
                        if(ass == null){
                            array.push(oitoH)
                        }
                    }

                    if (tt = await agendamentoModel.find({servico: idServico, data: noveH}).select("_id")) {
                        ass = await agendamentoModel.findById(tt)
                        if(ass == null){
                            array.push(noveH)
                        }
                    }

                    if (tt = await agendamentoModel.find({servico: idServico, data: dezH}).select("_id")) {
                        ass = await agendamentoModel.findById(tt)
                        if(ass == null){
                            array.push(dezH)
                        }  
                    }  
                    
                }
                else {
                    res.json({msg: "erro"})
                }
  



            }


                //const io = await agendamentoModel.findOneAndUpdate({id:"655df139c824eff2cbe43b19", status: 'A'})

                
  
            
            //console.log(a)
            
            //const update =  await agendamentoModel.f({id:"655d77041d5f1eaae410170c", data:})

   
           /*/ 
            */

            var dataAtual = new Date().toLocaleString();
            console.log(dataAtual)

           /*const data = new Date()
            const dataSemanal = data.getDay();
            const hora = data.toLocaleTimeString()

            console.log(dataSemanal, hora)*/
            var da = new Date()
            console.log(da)
                

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = agendamentoController