const { Horario: horarioModel } = require("../models/horario.js");
const horarioController = require("../controllers/horarioController");
const httpMocks = require("node-mocks-http");

jest.mock("../models/horario.js");

describe("horarioController", () => {
    let req, res, next;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("create", () => {
        it("deve criar um novo horário com sucesso", async () => {
            req.body = {
                dia: [1, 2, 3],
                inicio: 9,
                fim: 17,
            };

            horarioModel.findOne.mockResolvedValue(null); // Simula que não existe horário
            horarioModel.create.mockResolvedValue({}); // Simula criação bem-sucedida

            await horarioController.create(req, res, next);

            expect(horarioModel.findOne).toHaveBeenCalledWith({ horario: req.body });
            expect(horarioModel.create).toHaveBeenCalledTimes(3); // Deve criar 3 horários
            expect(res.statusCode).toBe(201);
        });

        it("deve retornar mensagem se o horário já existir", async () => {
            req.body = {
                dia: [1, 2, 3],
                inicio: 9,
                fim: 17,
            };

            horarioModel.findOne.mockResolvedValue({}); // Simula que horário já existe

            await horarioController.create(req, res, next);

            expect(horarioModel.findOne).toHaveBeenCalledWith({ horario: req.body });
            expect(horarioModel.create).not.toHaveBeenCalled(); // Não deve criar horário
            expect(res.statusCode).toBe(201);
        });

        it("deve retornar erro em caso de falha", async () => {
            req.body = {
                dia: [1, 2, 3],
                inicio: 9,
                fim: 17,
            };

            horarioModel.findOne.mockRejectedValue(new Error("Erro ao buscar horário"));

            await horarioController.create(req, res, next);

            expect(res.statusCode).toBe(200);
        });
    });

    describe("calculoHoraEstabelecimento", () => {
        it("deve retornar se o estabelecimento está aberto", async () => {
            const currentHour = new Date().getHours();
            req.body = {}; // Não precisa de corpo

            // Mock dos horários
            horarioModel.findOne.mockResolvedValue({ inicio: 9, fim: 17 });
            await horarioController.calculoHoraEstabelecimento(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({
                msg: currentHour >= 9 && currentHour < 17,
                horaInicio: 9,
                horaFim: 17
            });
        });

        it("deve retornar erro em caso de falha", async () => {
            horarioModel.findOne.mockRejectedValue(new Error("Erro ao buscar horário"));

            await horarioController.calculoHoraEstabelecimento(req, res);

            expect(res.statusCode).toBe(200);
        });
    });

    describe("get", () => {
        it("deve retornar os horários", async () => {
            const mockHorarios = [
                { dia: 1, inicio: 9, fim: 17 },
                { dia: 2, inicio: 10, fim: 18 },
            ];
            horarioModel.find.mockResolvedValue(mockHorarios); // Mock da busca

            await horarioController.get(req, res, next);

            expect(horarioModel.find).toHaveBeenCalled();
            expect(res.statusCode).toBe(200);
        });

        it("deve retornar erro em caso de falha", async () => {
            horarioModel.find.mockRejectedValue(new Error("Erro ao buscar horários"));

            await horarioController.get(req, res, next);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ error: new Error("Erro ao buscar horários") });
        });
    });

    describe("alterarHorario", () => {
        it("deve atualizar os horários com sucesso", async () => {
            req.body = {
                dia: [1],
                inicio: [10],
                fim: [18],
                data: [new Date()],
            };

            horarioModel.findOneAndUpdate.mockResolvedValue({}); // Simula sucesso na atualização

            await horarioController.alterarHorario(req, res, next);

            expect(horarioModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({ msg: "Dados atualizados com sucesso!" });
        });

        it("deve retornar erro em caso de falha", async () => {
            req.body = {
                dia: [1],
                inicio: [10],
                fim: [18],
                data: [new Date()],
            };

            horarioModel.findOneAndUpdate.mockRejectedValue(new Error("Erro ao atualizar horário"));

            await horarioController.alterarHorario(req, res, next);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({ error: new Error("Erro ao atualizar horário") });
        });
    });

    describe("restaurarHorarioPadrao", () => {
        it("deve restaurar o horário padrão", async () => {
            const mockDocumentos = [{ dia: 1, diaVariavel: new Date(Date.now() + 10000) }]; // Mock de documentos
            horarioModel.find.mockResolvedValue(mockDocumentos); // Mock da busca

            await horarioController.restaurarHorarioPadrao();

            expect(horarioModel.find).toHaveBeenCalled();
        });

        it("deve tratar erros durante a restauração", async () => {
            horarioModel.find.mockRejectedValue(new Error("Erro ao buscar horários"));

            await horarioController.restaurarHorarioPadrao();

            expect(horarioModel.find).toHaveBeenCalled();
        });
    });
});
