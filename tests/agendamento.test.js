const { agendamentoController } = require("../controllers/agendamentoController");
const { Agendamento: agendamentoModel } = require("../models/agendamento");
const { Servico: servicoModel } = require("../models/servico");
const { Quadra: quadraModel } = require("../models/quadra");

jest.mock("../models/agendamento");
jest.mock("../models/servico");
jest.mock("../models/quadra");

describe("Agendamento Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve criar um agendamento com sucesso", async () => {
        // Mockando as respostas dos modelos
        quadraModel.findOne.mockResolvedValue({ _id: 'quadraId' });
        servicoModel.findOne.mockResolvedValue({ _id: 'servicoId', preco: 100 });

        const req = {
            body: {
                data: ['2024-09-30'],
                transacao: 'transacao123',
                quadra: '1',
                servico: 'Futebol',
                hora: ['10:00', '11:00']
            },
            usuario: 'clienteId'
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await agendamentoController.create(req, res);

        expect(agendamentoModel.create).toHaveBeenCalledTimes(2); // Para duas horas
        expect(agendamentoModel.create).toHaveBeenCalledWith({
            data: '2024-09-30',
            hora: '10:00',
            valor: 100,
            transacao: 'transacao123',
            quadra: { _id: 'quadraId' },
            cliente: 'clienteId',
            servico: { _id: 'servicoId' }
        });
        expect(agendamentoModel.create).toHaveBeenCalledWith({
            data: '2024-09-30',
            hora: '11:00',
            valor: 100,
            transacao: 'transacao123',
            quadra: { _id: 'quadraId' },
            cliente: 'clienteId',
            servico: { _id: 'servicoId' }
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ msg: "Parabéns, agendamento realizado com sucesso!" });
    });

    it("deve retornar erro ao buscar quadra", async () => {
        // Mockando erro na busca da quadra
        quadraModel.findOne.mockRejectedValue(new Error('Erro ao buscar quadra'));

        const req = {
            body: {
                data: ['2024-09-30'],
                transacao: 'transacao123',
                quadra: '1',
                servico: 'Futebol',
                hora: ['10:00']
            },
            usuario: 'clienteId'
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await agendamentoController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: expect.any(Error) });
    });
});
