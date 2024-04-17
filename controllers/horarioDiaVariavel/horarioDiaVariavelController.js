const {HorarioDiaVariavel: HorarioDiaVariavelModel} = require("../../models/horarioDiaVariavel");
const {Horario: HorarioModel} = require("../../models/horario");

const horarioDiaVariavelController = {
    create: async (req, res) => {
        try {
            //const {dia, inicio, fim} = req;
            const horarioCadastrado = await HorarioModel.find()

            for (let i = 0; i < horarioCadastrado[0].dia.length; i++) {
                await HorarioDiaVariavelModel.create({dia: horarioCadastrado[0].dia[i], inicio: horarioCadastrado[0].inicio, fim: horarioCadastrado[0].fim});   
            }

            res.status(200).json(await HorarioDiaVariavelModel.find())

        } catch (error) {
            
        }
    },

    alterarHorario: async (req, res)=> {
        try {
            const {dia, inicio, fim} = req.body

            // Iterar sobre o dia que serão atualizados os horários

            const horariosAtualizados = await Promise.all(dia.map(async (element, i)=>{
                if(inicio.length == 1){
                    return await HorarioDiaVariavelModel.findOneAndUpdate({dia: dia[i]}, {inicio: inicio[0], fim: fim[0], status: true});
                }
                else {
                    return await HorarioDiaVariavelModel.findOneAndUpdate({dia: dia[i]}, {inicio: inicio[i], fim: fim[i], status: true});
                }
            }));

            res.status(200).json({msg:"Dados atualizados com sucesso!"});

        } catch (error) {
            res.json({error})
        }
    }

}
module.exports = horarioDiaVariavelController