const { Horario: horarioModel } = require("../models/horario");

const formatoHora = {
    create: async () => {

        // Pegando o dia da semana para buscar o documento que corresponde a ele.
        const diaSemana = new Date().getDay()

        // Buscando o horário correspondente ao dia da semana no banco de dados.
        const horarioDocumento = await horarioModel.findOne({dia: diaSemana});
        let horarioInicio = parseInt(horarioDocumento.inicio)
        let horaValidacao = parseInt(horarioDocumento.inicio)
        let horarioFechar  = parseInt(horarioDocumento.fim)

        if(horarioFechar < horarioInicio) {
            horarioFechar += 24
        }

        // Calculando a carga horária
        const cargaHoraria = horarioFechar - horarioInicio
        let arrayHoras = [];
        let arrayHorasSemFormato = []
        
        // Pegando todos os horários da carga horária e colocando em um array.
        for (let i = 0; i < cargaHoraria; i++) {
             let horaAtual = (horarioInicio + i) % 24; // Faz a rotação das horas para que reinicie em 0 após 23
            arrayHorasSemFormato.push(horaValidacao + i);
            arrayHoras.push(horaAtual);
        }

        return {arrayHoras, horarioFechar, horarioInicio, cargaHoraria, arrayHorasSemFormato}
    }
};

module.exports = formatoHora.create()