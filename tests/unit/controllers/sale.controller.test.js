const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);
const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const {
  rightSaleBody,
  saleCreateResponse,
  wrongSaleNotProductIdBody } = require('../../../__tests__/_dataMock');
const { allSales, getSaleById } = require('../mocks/dataMocks')

describe('Sale Controller', function () {
  afterEach(sinon.restore);

  describe('Cria vendas', function () {
    it('Cria vendas com produtos válidos', async function () {
      const res = {};
      const req = { rightSaleBody };
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      sinon.stub(salesService, 'registerSales').resolves({ type: null, message: saleCreateResponse })
      await salesController.registerSales(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleCreateResponse);
    });

    it('Cria vendas com produtos inválidos', async function () {
      const res = {};
      const req = { wrongSaleNotProductIdBody };
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      sinon.stub(salesService, 'registerSales').resolves({ type: 404, message: 'Product not found' })
      await salesController.registerSales(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });

    })
  });

  describe('Localiza vendas', function () {
    it('Localiza todas as vendas', async function () {
      const res = {};
      const req = {};
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      sinon.stub(salesService, 'getAllSales').resolves({ type: null, message: allSales })
      await salesController.getAllSales(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });

    it('Localiza todas as vendas com ID válidas', async function () {
      const res = {};
      const req = { params: { id: 2 } };
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      sinon.stub(salesService, 'getSaleById').resolves({ type: null, message: getSaleById });
      await salesController.getSaleById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(getSaleById);
    });
  });
});