const sinon = require('sinon');
const { expect } = require('chai');
const salesProductsService = require('../../../src/services/salesProductsService');
const salesProductsModel = require('../../../src/models/salesProductsModel');
const CustomError = require('../../../src/errors/CustomError');
const {
  salesWithProducts,
  productsFromASale,
  updatedProducts,
  saleWithUpdatedProducts,
} = require('../mock/data');

describe('salesProductsService', () => {

  afterEach(sinon.restore);

  describe('#listSalesWithProducts', () => {

    describe('a função', async () => {
      it('deve retorna um array contendo as vendas com os produtos', async () => {
        sinon.stub(salesProductsModel, 'listSalesWithProducts').resolves(salesWithProducts);
        const result = await salesProductsService.listSalesWithProducts();
        expect(result).to.be.an('array').equals(salesWithProducts);
      });
    });

  });

  describe('#getProductsFromASale', () => {

    describe('se a venda existe', async () => {
      it('retorna os produtos da venda', async () => {
        sinon.stub(salesProductsModel, 'getProductsFromASale').resolves(productsFromASale);
        const result = await salesProductsService.getProductsFromASale(1);
        expect(result).to.be.an('array').equals(productsFromASale);
      });
    });

    describe('se a venda não existe', async () => {
      it('lança uma exceção com a mensagem "Sale not found"', async () => {
        sinon.stub(salesProductsModel, 'getProductsFromASale').resolves([]);
        await expect(salesProductsService.getProductsFromASale(5))
          .to.be.rejectedWith(CustomError, 'Sale not found');
      });
    });

  });

  describe('#updateProductsFromASale', () => {

    describe('ao atualizar os produtos', async () => {
      it('retorna um objeto com o id da venda e os produtos atualizados', async () => {
        sinon.stub(salesProductsModel, 'updateProductFromASale').resolves(1);
        const result = await salesProductsService.updateProductsFromASale(1, updatedProducts);
        expect(result).to.be.an('object').that.includes(saleWithUpdatedProducts);
      });
    });

  });

});
