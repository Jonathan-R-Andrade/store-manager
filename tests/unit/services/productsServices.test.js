const sinon = require('sinon');
const { expect, use } = require('chai');
const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');
const CustomError = require('../../../errors/CustomError');
const chaiAsPromised = require('chai-as-promised');

use(chaiAsPromised);

describe('productsService', () => {

  afterEach(sinon.restore);
  const products = [{ id: 1, name: 'PS5' }, { id: 2, name: 'Xbox SX' }];

  describe('#validateId', () => {

    describe('ao receber um id invalido', async () => {
      it('lança uma exceção com a mensagem ("id" must be a number)', async () => {
        expect(() => productsService.validateId('abc')).to
          .throw(CustomError, '"id" must be a number');
      });
    });

    describe('ao receber um id valido', async () => {
      it('não lança exceção', async () => {
        expect(() => productsService.validateId(1)).to.not.throw(Error);
      });
    });

  });

  describe('#getProduct', () => {

    describe('quando o produto existe', async () => {
      it('retorna o produto correspondente ao id', async () => {
        sinon.stub(productsModel, 'getProduct').resolves(products[0]);
        const response = await productsService.getProduct(1);
        expect(response).to.be.a('object').equal(products[0]);
      });
    });

    describe('quando o produto não existe', async () => {
      it('lança uma exceção com a mensagem "Product not found"', async () => {
        sinon.stub(productsModel, 'getProduct').resolves(undefined);
        await expect(productsService.getProduct(3))
          .to.be.rejectedWith(CustomError, 'Product not found');
      });
    });

  });

  describe('#listProducts', () => {

    describe('quando existe produtos', async () => {
      it('retorna um array com os produtos', async () => {
        sinon.stub(productsModel, 'listProducts').resolves(products);
        const response = await productsService.listProducts();
        expect(response).to.be.an('array').equals(products);
      });
    });

    describe('quando não existe produtos', async () => {
      it('retorna um array vazio', async () => {
        sinon.stub(productsModel, 'listProducts').resolves([]);
        const response = await productsService.listProducts();
        expect(response).to.be.an('array').that.is.empty;
      });
    });

  });

});
