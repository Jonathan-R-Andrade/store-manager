const sinon = require('sinon');
const { expect } = require('chai');
const salesProductsService = require('../../../services/salesProductsService');
const salesProductsModel = require('../../../models/salesProductsModel');
const CustomError = require('../../../errors/CustomError');

describe('salesProductsService', () => {

  afterEach(sinon.restore);

  const salesWithProducts = [
    {
      saleId: 1,
      date: "2022-07-05T19:05:53.479Z",
      productId: 5,
      quantity: 2
    },
    {
      saleId: 2,
      date: "2022-07-05T19:05:53.479Z",
      productId: 3,
      quantity: 1
    }
  ];

  const productsFromASale = [
    {
      date: "2022-07-05T19:57:21.000Z",
      productId: 1,
      quantity: 5
    },
    {
      date: "2022-07-05T19:57:21.000Z",
      productId: 2,
      quantity: 10
    }
  ];

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

});
