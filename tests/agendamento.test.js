const { Agendamento: agendamentoModel } = require("../models/agendamento");
const { Servico: servicoModel } = require("../models/servico");
const { Quadra: quadraModel } = require("../models/quadra");
const agendamentoController = require("../controllers/agendamentoController")
jest.mock("../models/agendamento");
jest.mock("../models/servico");
jest.mock("../models/quadra");

describe("Agendamento Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpar mocks entre os testes
    });

    it("deve criar um agendamento com sucesso", async () => {
        quadraModel.findOne.mockReturnValue({
            select: jest.fn().mockResolvedValue({ _id: 'quadraId' })
        });      servicoModel.findOne.mockReturnValue({
            select: jest.fn().mockResolvedValue({ _id: 'servicoId', preco: 100 })
        });

        // Mockando o método create do Agendamento
        agendamentoModel.create = jest.fn(); // mockando o create para evitar a chamada ao banco

        // Simulando a requisição do controller
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

        // Verificando se o método create foi chamado para cada hora
        expect(agendamentoModel.create).toHaveBeenCalledTimes(2); // Para duas horas
        expect(agendamentoModel.create).toHaveBeenCalledWith({
            data: '2024-09-30',
            hora: '10:00',
            valor: 100,
            transacao: 'transacao123',
            quadra: { _id: 'quadraId' },
            cliente: 'clienteId',
            servico: 'servicoId',  // Aqui estamos passando o ID como string
        });
        expect(agendamentoModel.create).toHaveBeenCalledWith({
            data: '2024-09-30',
            hora: '10:00',
            valor: 100,
            transacao: 'transacao123',
            quadra: { _id: 'quadraId' },
            cliente: 'clienteId',
            servico: 'servicoId',  // Aqui estamos passando o ID como string
        });
        // Verificando se a resposta do controller foi correta
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ msg: "Parabéns, agendamento realizado com sucesso!" });
    });

    it("deve retornar erro ao buscar quadra", async () => {
        // Mocka o erro na busca da quadra
        quadraModel.findOne.mockImplementation(() => {
            throw new Error('Erro ao buscar quadra');
        });
    
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
    
        // Executa o método create do controller
        await agendamentoController.create(req, res);
    
        // Verifica se o status 500 foi retornado
        expect(res.status).toHaveBeenCalledWith(500);
        // Verifica se a mensagem de erro correta foi retornada
        expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao buscar quadra' });
    });
});



