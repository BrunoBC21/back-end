const mongoose = require("mongoose");
const { Horario } = require("../models/horario");

beforeAll(async () => {
    // Conectar ao banco de dados de teste
    await mongoose.connect("mongodb://localhost:27017/testdb", { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    // Desconectar do banco de dados após os testes
    await mongoose.connection.close();
});

describe("Modelo Horario", () => {
    afterEach(async () => {
        // Limpar a coleção após cada teste
        await Horario.deleteMany({});
    });

    test("deve criar um novo horário com dados válidos", async () => {
        const horarioData = {
            dia: [1, 2, 3],
            inicio: 9,
            fim: 17,
        };

        const horario = await Horario.create(horarioData);
        expect(horario._id).toBeDefined();
        expect(horario.dia).toEqual(horarioData.dia);
        expect(horario.inicio).toBe(horarioData.inicio);
        expect(horario.fim).toBe(horarioData.fim);
    });

    // test("não deve criar um horário sem o campo 'dia'", async () => {
    //     const horarioData = {
    //         inicio: 9,
    //         fim: 17,
    //     };

    //     await expect(Horario.create(horarioData)).rejects.toThrow();
    // });

    test("deve encontrar um horário existente", async () => {
        const horarioData = {
            dia: [1],
            inicio: 10,
            fim: 18,
        };

        const horario = await Horario.create(horarioData);
        const foundHorario = await Horario.findById(horario._id);
        
        expect(foundHorario).toBeDefined();
        expect(foundHorario.inicio).toBe(horarioData.inicio);
    });

    test("deve atualizar um horário", async () => {
        const horarioData = {
            dia: [1],
            inicio: 10,
            fim: 18,
        };

        const horario = await Horario.create(horarioData);
        const updatedHorario = await Horario.findByIdAndUpdate(horario._id, { fim: 20 }, { new: true });

        expect(updatedHorario.fim).toBe(20);
    });

    test("deve remover um horário", async () => {
        const horarioData = {
            dia: [1],
            inicio: 10,
            fim: 18,
        };

        const horario = await Horario.create(horarioData);
        await Horario.findByIdAndDelete(horario._id);
        const foundHorario = await Horario.findById(horario._id);

        expect(foundHorario).toBeNull(); // Deve ser null após a exclusão
    });
});
