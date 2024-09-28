const mongoose = require("mongoose");
const { Quadra } = require("../models/quadra");

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Modelo Quadra", () => {
    afterEach(async () => {
        await Quadra.deleteMany({});
    });

    test("deve criar uma nova quadra com dados válidos", async () => {
        const quadraData = {
            numero: 1,
            foto: "url-da-foto.com",
        };

        const quadra = await Quadra.create(quadraData);
        expect(quadra._id).toBeDefined();
        expect(quadra.numero).toBe(quadraData.numero);
        expect(quadra.foto).toBe(quadraData.foto);
    });

    test("não deve criar uma quadra sem o campo 'numero'", async () => {
        const quadraData = {
            foto: "url-da-foto.com",
        };

        await expect(Quadra.create(quadraData)).rejects.toThrow();
    });

    test("não deve criar uma quadra com um 'numero' já existente", async () => {
        const quadraData = {
            numero: 1,
            foto: "url-da-foto.com",
        };

        await Quadra.create(quadraData); // Criar a primeira quadra

        const secondQuadraData = {
            numero: 1,
            foto: "outra-url-da-foto.com",
        };

        await expect(Quadra.create(secondQuadraData)).rejects.toThrow();
    });

    test("deve encontrar uma quadra existente", async () => {
        const quadraData = {
            numero: 1,
            foto: "url-da-foto.com",
        };

        const quadra = await Quadra.create(quadraData);
        const foundQuadra = await Quadra.findById(quadra._id);
        
        expect(foundQuadra).toBeDefined();
        expect(foundQuadra.numero).toBe(quadraData.numero);
    });

    test("deve atualizar uma quadra", async () => {
        const quadraData = {
            numero: 1,
            foto: "url-da-foto.com",
        };

        const quadra = await Quadra.create(quadraData);
        const updatedQuadra = await Quadra.findByIdAndUpdate(quadra._id, { foto: "nova-url-da-foto.com" }, { new: true });

        expect(updatedQuadra.foto).toBe("nova-url-da-foto.com");
    });

    test("deve remover uma quadra", async () => {
        const quadraData = {
            numero: 1,
            foto: "url-da-foto.com",
        };

        const quadra = await Quadra.create(quadraData);
        await Quadra.findByIdAndDelete(quadra._id);
        const foundQuadra = await Quadra.findById(quadra._id);

        expect(foundQuadra).toBeNull(); // Deve ser null após a exclusão
    });
});
