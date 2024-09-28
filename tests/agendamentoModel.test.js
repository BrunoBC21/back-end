const mongoose = require("mongoose");
const { Agendamento } = require("../models/agendamento");
const { Horario } = require("../models/horario"); // Supondo que você também tenha um modelo Horario
const { Cliente } = require("../models/cliente"); // Supondo que você também tenha um modelo Cliente
const { Servico } = require("../models/servico"); // Supondo que você também tenha um modelo Servico
const { Quadra } = require("../models/quadra"); // Supondo que você também tenha um modelo Quadra

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Modelo Agendamento", () => {
    afterEach(async () => {
        await Agendamento.deleteMany({});
    });

    test("deve criar um novo agendamento com dados válidos", async () => {
        // Criando dados de teste para outros modelos
        const horario = await Horario.create({ dia: [1], inicio: 10, fim: 18 });
        const quadra = await Quadra.create({ /* dados necessários para criar uma quadra */ });
        const servico = await Servico.create({ /* dados necessários para criar um serviço */ });
        const cliente = await Cliente.create({ nome: "Cliente Teste", telefone: "123456789", email: "cliente@test.com", senha: "senha" });

        const agendamentoData = {
            data: "2024-09-27",
            hora: "10:00",
            valor: 100,
            transacao: "transacao123",
            horario: horario._id,
            quadra: quadra._id,
            cliente: cliente._id,
            servico: servico._id,
        };

        expect(agendamento._id).toBeDefined();
        expect(agendamento.data).toBe(agendamentoData.data);
        expect(agendamento.hora).toBe(agendamentoData.hora);
        expect(agendamento.valor).toBe(agendamentoData.valor);
        expect(agendamento.transacao).toBe(agendamentoData.transacao);
        expect(agendamento.horario.toString()).toBe(quadra._id.toString());
        expect(agendamento.quadra.toString()).toBe(quadra._id.toString());
        expect(agendamento.cliente.toString()).toBe(cliente._id.toString());
        expect(agendamento.servico.toString()).toBe(servico._id.toString());
      });

    test("não deve criar um agendamento sem o campo 'data'", async () => {
        const agendamentoData = {
            hora: "10:00",
            quadra: new mongoose.Types.ObjectId(),
            servico: new mongoose.Types.ObjectId(),
        };

        await expect(Agendamento.create(agendamentoData)).rejects.toThrow();
    });

    test("não deve criar um agendamento sem o campo 'hora'", async () => {
        const agendamentoData = {
            data: "2024-09-27",
            quadra: new mongoose.Types.ObjectId(),
            servico: new mongoose.Types.ObjectId(),
        };

        await expect(Agendamento.create(agendamentoData)).rejects.toThrow();
    });

    test("deve encontrar um agendamento existente", async () => {
        const agendamentoData = {
            data: "2024-09-27",
            hora: "10:00",
            quadra: new mongoose.Types.ObjectId(),
            servico: new mongoose.Types.ObjectId(),
        };

        const agendamento = await Agendamento.create(agendamentoData);
        const foundAgendamento = await Agendamento.findById(agendamento._id);
        
        expect(foundAgendamento).toBeDefined();
        expect(foundAgendamento.data).toBe(agendamentoData.data);
    });

    test("deve atualizar um agendamento", async () => {
        const agendamentoData = {
            data: "2024-09-27",
            hora: "10:00",
            quadra: new mongoose.Types.ObjectId(),
            servico: new mongoose.Types.ObjectId(),
        };

        const agendamento = await Agendamento.create(agendamentoData);
        const updatedAgendamento = await Agendamento.findByIdAndUpdate(agendamento._id, { status: 'cancelado' }, { new: true });

        expect(updatedAgendamento.status).toBe('cancelado');
    });

    test("deve remover um agendamento", async () => {
        const agendamentoData = {
            data: "2024-09-27",
            hora: "10:00",
            quadra: new mongoose.Types.ObjectId(),
            servico: new mongoose.Types.ObjectId(),
        };

        const agendamento = await Agendamento.create(agendamentoData);
        await Agendamento.findByIdAndDelete(agendamento._id);
        const foundAgendamento = await Agendamento.findById(agendamento._id);

        expect(foundAgendamento).toBeNull(); // Deve ser null após a exclusão
    });
});
