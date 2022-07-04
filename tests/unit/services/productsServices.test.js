const sinon = require('sinon');
const { expect, use } = require('chai');
const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');
const CustomError = require('../../../errors/CustomError');
const chaiAsPromised = require('chai-as-promised');

use(chaiAsPromised);

describe('productsService', () => {

  afterEach(sinon.restore);
  const correctProduct = { name: 'PlayStation 5' };
  const products = [
    { id: 1, name: 'PlayStation 5' },
    { id: 2, name: 'Xbox Series X' }
  ];

  describe('#getProduct', () => {

    describe('quando o produto existe', async () => {
      it('retorna o produto correspondente ao id', async () => {
        sinon.stub(productsModel, 'getProduct').resolves(products[0]);
        const response = await productsService.getProduct(1);
        expect(response).to.be.an('object').equal(products[0]);
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

  describe('#addProduct', () => {

    describe('ao adicionar o produto no banco de dados', async () => {
      it('retorna o produto com seu id', async () => {
        sinon.stub(productsModel, 'addProduct').resolves(1);
        const response = await productsService.addProduct(correctProduct);
        expect(response).to.be.an('object').that.includes(products[0]);
      });
    });

  });

  describe('#updateProduct', () => {

    describe('ao atualizar um produto com sucesso', async () => {
      it('retorna o produto com seu id', async () => {
        sinon.stub(productsModel, 'updateProduct').resolves(1);
        const response = await productsService.updateProduct(1, correctProduct);
        expect(response).to.be.an('object').that.includes(products[0]);
      });
    });

    describe('ao tentar atualizar um produto que não existe', async () => {
      it('lança uma exceção com a mensagem "Product not found"', async () => {
        sinon.stub(productsModel, 'updateProduct').resolves(0);
        await expect(productsService.updateProduct(5, correctProduct))
          .to.be.rejectedWith(CustomError, 'Product not found');
      });
    });

  });

});
