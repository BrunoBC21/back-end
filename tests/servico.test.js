const servicoService = require('../src/services/serivcoService');
const servicoRepository = require('../src/repositories/ServicoRepository');

// Mock do módulo servicoRepository
jest.mock('../src/repositories/ServicoRepository');

describe('Testes para servicoService', () => {

  // Limpa todos os mocks antes de cada teste para evitar interferências
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve criar um serviço com sucesso', async () => {
    // Simula que o serviço não existe
    servicoRepository.buscarServico.mockResolvedValue(null);
    servicoRepository.criarServico.mockResolvedValue({ id: 1, modalidade: 'Futebol' });

    const servico = { modalidade: 'Futebol' };
    const resultado = await servicoService.criarServico(servico);

    expect(resultado.status).toBe(201);
    expect(resultado.msg).toBe('Servico criado com sucesso');
    expect(servicoRepository.buscarServico).toHaveBeenCalledWith({ modalidade: 'Futebol' });
    expect(servicoRepository.criarServico).toHaveBeenCalledWith(servico);
  });

  test('deve retornar erro 409 se o serviço já existir', async () => {
    // Simula que o serviço já existe
    servicoRepository.buscarServico.mockResolvedValue({ id: 1, modalidade: 'Futebol' });

    const servico = { modalidade: 'Futebol' };
    const resultado = await servicoService.criarServico(servico);

    expect(resultado.status).toBe(409);
    expect(resultado.msg).toBe('Servico já existe!');
    expect(servicoRepository.criarServico).not.toHaveBeenCalled();
  });

  test('deve retornar erro 500 em caso de falha no sistema ao criar serviço', async () => {
    // Simula um erro ao buscar serviço
    servicoRepository.buscarServico.mockRejectedValue(new Error('Falha ao buscar serviço'));

    const servico = { modalidade: 'Basquete' };
    const resultado = await servicoService.criarServico(servico);

    expect(resultado.status).toBe(500);
    expect(resultado.error).toBe('Erro ao criar servico');
  });

  test('deve buscar todos os serviços com sucesso', async () => {
    const servicos = [
      { id: 1, modalidade: 'Futebol' },
      { id: 2, modalidade: 'Basquete' }
    ];
    servicoRepository.buscarTodosServicos.mockResolvedValue(servicos);

    const resultado = await servicoService.buscarTodosServicos();

    expect(resultado.status).toBe(200);
    expect(resultado.msg).toEqual(servicos);
    expect(servicoRepository.buscarTodosServicos).toHaveBeenCalled();
  });

  test('deve retornar erro 500 em caso de falha ao buscar todos os serviços', async () => {
    // Simula um erro ao buscar todos os serviços
    servicoRepository.buscarTodosServicos.mockRejectedValue(new Error('Falha ao buscar serviços'));

    const resultado = await servicoService.buscarTodosServicos();

    expect(resultado.status).toBe(500);
    expect(resultado.error).toBe('Erro ao criar servico');
  });

});
