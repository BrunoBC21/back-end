const mongoose = require('mongoose');
const { Servico } = require('../models/servico'); // Ajuste o caminho conforme necessário

describe('Servico Model Test', () => {
  beforeAll(async () => {
    // Conectar ao banco de dados em memória
    await mongoose.connect('mongodb://localhost:27017/test', { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
  });

  afterAll(async () => {
    // Fechar a conexão após os testes
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Limpar a coleção antes de cada teste
    await Servico.deleteMany({});
  });

  it('should create a new servico', async () => {
    const servicoData = {
      modalidade: 'Futebol',
      preco: '50',
      recorrencia: 1,
      descricao: 'Aula de futebol',
      status: 'A',
    };

    const servico = await Servico.create(servicoData);

    expect(servico._id).toBeDefined();
    expect(servico.modalidade).toBe(servicoData.modalidade);
    expect(servico.preco).toBe(servicoData.preco);
    expect(servico.recorrencia).toBe(servicoData.recorrencia);
    expect(servico.descricao).toBe(servicoData.descricao);
    expect(servico.status).toBe(servicoData.status);
  });

  it('should fail to create a servico without required fields', async () => {
    const servicoData = {
      preco: '50',
    };

    await expect(Servico.create(servicoData)).rejects.toThrow();
  });

  it('should validate the enum status', async () => {
    const servicoData = {
      modalidade: 'Futebol',
      preco: '50',
      status: 'X', // status inválido
    };

    await expect(Servico.create(servicoData)).rejects.toThrow();
  });

  it('should create servico with default status', async () => {
    const servicoData = {
      modalidade: 'Futebol',
      preco: '50',
    };

    const servico = await Servico.create(servicoData);

    expect(servico.status).toBe('A'); // Verifica se o status padrão é 'A'
  });
});
