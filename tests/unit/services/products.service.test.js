const { expect } = require('chai');
const sinon = require('sinon');
const productService = require('../../../src/services/product.service');
const productModel = require('../../../src/models/product.model');
const { allProductsResponse,
  productSearchNameResponse,
  productUpdateExistsNameBody,
  rightProductBody } = require('../../../__tests__/_dataMock');

describe('Product Service', function () {
  afterEach(sinon.restore);

  describe('Cria novos produtos', function () {
    it('Cria produtos válidos', async function () {
      sinon.stub(productModel, 'createProduct').resolves({ insertedId: 1 });
      sinon.stub(productModel, 'getProductById').resolves(productSearchNameResponse);
      const result = await productService.createProduct(productUpdateExistsNameBody);
      expect(result.message).to.be.deep.equal(productSearchNameResponse);
    })
  })

  describe('Atualiza os produtos', function () {
    it('Atualiza produtos válidos', async function () {
      sinon.stub(productModel, 'getProductById').resolves(productSearchNameResponse);
      const result = await productService.updateProduct(1, rightProductBody);
      expect(result.message).to.be.deep.equal({ id: 1, name: rightProductBody });
    })

    it('Atualiza produtos inválidos', async function () {
      sinon.stub(productModel, 'getProductById').resolves(undefined);
      const result = await productService.updateProduct(1, rightProductBody);
      expect(result.message).to.be.deep.equal({ message: 'Product not found' });
    })
  })

  describe('Deleta os produtos', function () {
    it('Deleta os produtos válidos', async function () {
      sinon.stub(productModel, 'getProductById').resolves(productSearchNameResponse);
      const result = await productService.deleteProduct(1);
      expect(result.message).to.be.deep.equal(null);
    })

    it('Deleta os produtos inválidos', async function () {
      sinon.stub(productModel, 'getProductById').resolves(undefined);
      const result = await productService.deleteProduct(1);
      expect(result.message).to.be.deep.equal({ message: 'Product not found' });
    })
  })

  describe('Localiza os produtos', function () {
    it('Localiza todos os produtos', async function () {
      sinon.stub(productModel, 'getAllProducts').resolves(allProductsResponse);
      const result = await productService.getAllProducts();
      expect(result.message).to.be.deep.equal(allProductsResponse);
    })

    it('Localiza todos produtos pelo ID', async function () {
      sinon.stub(productModel, 'getProductById').resolves(productSearchNameResponse);
      const result = await productService.getProductById();
      expect(result.message).to.be.deep.equal(productSearchNameResponse);
    })

    it('Localiza os produtos pelo ID incorreto', async function () {
      sinon.stub(productModel, 'getProductById').resolves(undefined);
      const result = await productService.getProductById();
      expect(result.message).to.be.deep.equal({ message: 'Product not found' });
    })
  });
});