const quadraService = require('../src/services/quadraService');
const quadraRepository = require('../src/repositories/quadraRepository');

// Mock do módulo quadraRepository
jest.mock('../src/repositories/quadraRepository');

describe('Testes para quadraService', () => {
  
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa todos os mocks antes de cada teste
  });

  test('deve criar uma quadra com sucesso', async () => {
    // Simula que a quadra não existe
    quadraRepository.buscarQuadra.mockResolvedValue(null);
    quadraRepository.criarQuadra.mockResolvedValue({ id: 1, numero: 1 });

    const quadra = { numero: 1};
    const resultado = await quadraService.criarQuadra(quadra);

    expect(quadraRepository.buscarQuadra).toHaveBeenCalledWith({ numero: quadra.numero });
    expect(quadraRepository.criarQuadra).toHaveBeenCalledWith(quadra);
    expect(resultado.status).toBe(201);
    expect(resultado.msg).toBe('Número da quadra criado com sucesso');
  });

  test('deve retornar erro 409 se o número da quadra já existir', async () => {
    // Simula que a quadra já existe
    quadraRepository.buscarQuadra.mockResolvedValue({ id: 1, numero: 1 });

    const quadra = { numero: 1};
    const resultado = await quadraService.criarQuadra(quadra);

    expect(quadraRepository.buscarQuadra).toHaveBeenCalledWith({ numero: quadra.numero });
    expect(quadraRepository.criarQuadra).not.toHaveBeenCalled(); // Não deve criar a quadra
    expect(resultado.status).toBe(409);
    expect(resultado.msg).toBe('Número da quadra já existe');
  });

  test('deve retornar erro 500 em caso de falha ao criar quadra', async () => {
    // Simula um erro ao buscar a quadra
    quadraRepository.buscarQuadra.mockRejectedValue(new Error('Falha ao buscar quadra'));

    const quadra = { numero: 1};
    const resultado = await quadraService.criarQuadra(quadra);

    expect(quadraRepository.buscarQuadra).toHaveBeenCalledWith({ numero: quadra.numero });
    expect(resultado.status).toBe(500);
    expect(resultado.error).toEqual(new Error('Falha ao buscar quadra'));
  });

  test('deve buscar todas as quadras com sucesso', async () => {
    const quadras = [
      { id: 1, numero: 1},
      { id: 2, numero: 2}
    ];

    // Simula o comportamento do método buscarQuadra (erro no código original)
    quadraRepository.buscarTodasQuadra.mockResolvedValue(quadras);

    const resultado = await quadraService.buscarTodasQuadra();

    expect(quadraRepository.buscarTodasQuadra).toHaveBeenCalled();
    expect(resultado.status).toBe(200);
    expect(resultado.msg).toEqual(quadras);
  });

  test('deve retornar erro 500 em caso de falha ao buscar todas as quadras', async () => {
    // Simula um erro ao buscar todas as quadras
    quadraRepository.buscarTodasQuadra.mockRejectedValue(new Error('Falha ao buscar todas as quadras'));

    const resultado = await quadraService.buscarTodasQuadra();

    expect(quadraRepository.buscarTodasQuadra).toHaveBeenCalled();
    expect(resultado.status).toBe(500);
    expect(resultado.error).toEqual(new Error('Falha ao buscar todas as quadras'));
  });

});

describe('Testes para quadraRepository', () => {
  
  test('deve retornar erro ao buscar quadra se houver falha na operação', async () => {
    quadraRepository.buscarQuadra.mockRejectedValue(new Error('Erro ao buscar quadra'));

    try {
        await quadraRepository.buscarQuadra({ numero: 1 });
    } catch (error) {
        expect(error.message).toBe('Erro ao buscar quadra');
    }
});




  test('deve retornar erro ao criar quadra com número inválido', async () => {
    const quadraInvalida = { numero: null };  // Quadra inválida

    quadraRepository.criarQuadra.mockResolvedValue({ error: new Error('Número inválido') });

    const resultado = await quadraRepository.criarQuadra(quadraInvalida);

    expect(resultado).toEqual({ error: expect.any(Error) });
});

  test('deve buscar quadra pelo número com sucesso', async () => {
    const quadra = { id: 1, numero: 1 };

    quadraRepository.buscarQuadra.mockResolvedValue(quadra);

    const resultado = await quadraRepository.buscarQuadra({ numero: 1 });

    expect(quadraRepository.buscarQuadra).toHaveBeenCalledWith({ numero: 1 });
    expect(resultado).toEqual(quadra);
  });

  test('deve retornar erro ao buscar quadra se houver falha na operação', async () => {
    quadraRepository.buscarQuadra.mockRejectedValue(new Error('Erro ao buscar quadra'));

    const resultado = await quadraRepository.buscarQuadra({ numero: 1 });

    expect(resultado).toEqual({ error: expect.any(Error) });
  });

});