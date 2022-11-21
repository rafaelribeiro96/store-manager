const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);
const productController = require('../../../src/controllers/product.controller');
const productService = require('../../../src/services/product.service');
const {
  allProductsResponse,
  productSearchNameResponse } = require('../../../__tests__/_dataMock');

describe('Product Controller', function () {
  afterEach(sinon.restore);

  describe('Localiza os produtos', function () {
    it('Localiza todos os produtos', async function () {
      const res = {};
      const req = {};
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      sinon.stub(productService, 'getAllProducts').resolves({ type: null, message: allProductsResponse })
      await productController.getAllProducts(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse);
    });

    it('Localiza todos os produtos pelo ID', async function () {
      const res = {};
      const req = {
        params: { id: 2 },
      };
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      sinon.stub(productService, 'getProductById').resolves({ type: null, message: productSearchNameResponse })
      await productController.getProductById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productSearchNameResponse);
    });

    it('Localiza produtos com ID inválida', async function () {
      const res = {};
      const req = {
        params: { id: 20 },
      };
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      sinon.stub(productService, 'getProductById').resolves({ type: 404, message: { message: 'Product not found' } })
      await productController.getProductById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Deleta produtos', function () {
    it('Deletando produtos válidos', async function () {
      const res = {};
      const req = {
        params: { id: 2 },
      };
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(productService, 'deleteProduct').resolves({ type: null, message: null });
      await productController.deleteProduct(req, res);
      expect(res.status).to.have.been.calledWith(204);
    });

    it('Deletando produtos inválidos', async function () {
      const res = {};
      const req = {
        params: { id: 20 },
      };
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(productService, 'deleteProduct').resolves({ type: 404, message: { message: 'Product not found' } });
      await productController.deleteProduct(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
});