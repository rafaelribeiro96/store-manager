const { expect } = require('chai');
const sinon = require('sinon');
const saleModel = require('../../../src/models/sales.model');
const connection = require('../../../src/models/connection');
const { rightSaleBody } = require('../../../__tests__/_dataMock');
const { allSales} = require('../mocks/dataMocks')

describe('Sale Model', function () {
  afterEach(sinon.restore);

  describe('Cria vendas', function () {
    it('Cria a venda', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const result = await saleModel.registerSales(10, rightSaleBody[0]);
      expect(result).to.be.deep.equal({ insertId: 1 });
    });
  });

  describe('Localiza as vendas', function () {
    it('All sales', async function () {
      sinon.stub(connection, 'execute').resolves([allSales]);
      const result = await saleModel.getAllSales();
      expect(result).to.be.deep.equal(allSales);
    });
  })
})