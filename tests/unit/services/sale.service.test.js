const { expect } = require('chai');
const sinon = require('sinon');
const saleModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const validate = require('../../../src/middlewares/validateSales.js')
const {
  rightSaleBody,
  saleCreateResponse} = require('../../../__tests__/_dataMock');
const {
  allSales,
  getSaleById } = require('../mocks/dataMocks')

describe('Sale Service', function () {
  afterEach(sinon.restore);

  describe('Cadastra vendas', function () {
    it('Cadastra vendas com produtos válidos', async function () {
      sinon.stub(validate, 'validateSale').resolves(true);
      sinon.stub(saleModel, 'createSales').resolves({ insertId: 3 });
      sinon.stub(saleModel, 'registerSales')
        .onCall(0).resolves(rightSaleBody[ 0 ])
      const result = await salesService.registerSales(rightSaleBody);
      expect(result).to.be.deep.equal({ type: null, message: saleCreateResponse });
    });

    describe('Localiza vendas', function () {
      it('Localiza todas as vendas', async function () {
        sinon.stub(saleModel, 'getAllSales').resolves(allSales);
        const result = await salesService.getAllSales();
        expect(result.message).to.be.deep.equal(allSales);
      });

      it('Localiza vendas pela ID', async function () {
        sinon.stub(saleModel, 'getSaleById').resolves([allSales[3]]);
        const result = await salesService.getSaleById(1);
        expect(result.message).to.be.deep.equal(getSaleById);
      });
    })
  })
  })