const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/product.model');
const connection = require('../../../src/models/connection');
const { allProductsResponse, productSearchNameResponse } = require('../../../__tests__/_dataMock');

describe('Product Model', function () {
  afterEach(sinon.restore);

  describe('Localiza produtos', function () {
    it('Localiza todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([allProductsResponse]);
      const result = await productModel.getAllProducts();
      expect(result).to.be.deep.equal(allProductsResponse)
    });

    it('Localiza produto pela id', async function () {
      const [product] = productSearchNameResponse;
      sinon.stub(connection, 'execute').resolves([[product]]);
      const result = await productModel.getProductById();
      expect(result).to.be.deep.equal(product)
    });
  })
})