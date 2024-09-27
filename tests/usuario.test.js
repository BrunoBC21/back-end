const clienteService = require('../src/services/clienteService');
const clienteRepositery = require('../src/repositories/clienteRepository');
const criptografarSenhaUtil = require('../utils/criptografarSenhaUtil');
const validarEmailTelefone = require('../utils/validarEmailTelefoneUtil');

// Mocking dos módulos
jest.mock('../src/repositories/clienteRepository');
jest.mock('../utils/criptografarSenhaUtil');
jest.mock('../utils/validarEmailTelefoneUtil');

describe('Testes para clienteService', () => {
  
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa todos os mocks antes de cada teste
  });

  test('deve criar um usuário com sucesso', async () => {
    // Mocks para validação de email e telefone
    validarEmailTelefone.validarEmail.mockReturnValue(true);
    validarEmailTelefone.validarTelefone.mockReturnValue(true);
    
    // Mock para verificar se o usuário já existe
    clienteRepositery.buscarDadosUsuario.mockResolvedValue(null);

    // Mock para criptografar a senha
    criptografarSenhaUtil.criptografar.mockResolvedValue('senhaCriptografada');

    // Mock para criação de usuário
    clienteRepositery.criarUsuario.mockResolvedValue({ id: 1, email: 'teste@example.com' });

    const cliente = {
      nome: 'Teste',
      email: 'teste@example.com',
      telefone: '123456789',
      senha: 'senha123'
    };

    const resultado = await clienteService.criarUsuario(cliente);

    expect(resultado.status).toBe(201);
    expect(resultado.msg).toBe('Usuário criado com sucesso!');
    expect(clienteRepositery.criarUsuario).toHaveBeenCalledWith({
      ...cliente,
      senha: 'senhaCriptografada'
    });
  });

  test('deve retornar erro 409 se email já existir', async () => {
    validarEmailTelefone.validarEmail.mockReturnValue(true);
    validarEmailTelefone.validarTelefone.mockReturnValue(true);

    clienteRepositery.buscarDadosUsuario.mockResolvedValue({ email: 'teste@example.com' });

    const cliente = {
      nome: 'Teste',
      email: 'teste@example.com',
      telefone: '123456789',
      senha: 'senha123'
    };

    const resultado = await clienteService.criarUsuario(cliente);

    expect(resultado.status).toBe(409);
    expect(resultado.error).toBe('Email e número de telefone já existem no sistema');
    expect(clienteRepositery.criarUsuario).not.toHaveBeenCalled();
  });

  test('deve retornar erro 400 se o telefone for inválido', async () => {
    validarEmailTelefone.validarEmail.mockReturnValue(true);
    validarEmailTelefone.validarTelefone.mockReturnValue(false); // Telefone inválido

    const cliente = {
      nome: 'Teste',
      email: 'teste@example.com',
      telefone: 'telefone-invalido',
      senha: 'senha123'
    };

    const resultado = await clienteService.criarUsuario(cliente);

    expect(resultado.status).toBe(400);
    expect(resultado.error).toBe('Número de telefone inválido!');
  });

  test('deve retornar erro 400 se o email for inválido', async () => {
    validarEmailTelefone.validarEmail.mockReturnValue(false); // Email inválido
    validarEmailTelefone.validarTelefone.mockReturnValue(true);

    const cliente = {
      nome: 'Teste',
      email: 'email-invalido',
      telefone: '123456789',
      senha: 'senha123'
    };

    const resultado = await clienteService.criarUsuario(cliente);

    expect(resultado.status).toBe(400);
    expect(resultado.error).toBe('Email inválido');
  });

  test('deve retornar erro 500 em caso de falha no sistema', async () => {
    validarEmailTelefone.validarEmail.mockReturnValue(true);
    validarEmailTelefone.validarTelefone.mockReturnValue(true);
    
    // Simulando um erro no repositório
    clienteRepositery.buscarDadosUsuario.mockRejectedValue(new Error('Falha no sistema'));

    const cliente = {
      nome: 'Teste',
      email: 'teste@example.com',
      telefone: '123456789',
      senha: 'senha123'
    };

    const resultado = await clienteService.criarUsuario(cliente);

    expect(resultado.status).toBe(500);
    expect(resultado.error).toBe('Erro ao criar usuário');
  });

  test('deve retornar todos os usuários com sucesso', async () => {
    const usuarios = [{ id: 1, nome: 'Usuário 1' }, { id: 2, nome: 'Usuário 2' }];
    clienteRepositery.todosUsuarios.mockResolvedValue(usuarios);

    const resultado = await clienteService.todosUsuarios();

    expect(resultado.msg).toEqual(usuarios);
  });

  test('deve deletar um usuário com sucesso', async () => {
    await clienteService.deletarUsuario(1);

    expect(clienteRepositery.delete).toHaveBeenCalledWith(1);
  });
});