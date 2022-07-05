const sinon = require('sinon');
const { expect } = require('chai');
const salesProductsService = require('../../../services/salesProductsService');
const salesProductsModel = require('../../../models/salesProductsModel');

describe('salesProductsService', () => {

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
  ]

  describe('#listSalesWithProducts', () => {

    describe('a função', async () => {
      it('deve retorna um array contendo as vendas com os produtos', async () => {
        sinon.stub(salesProductsModel, 'listSalesWithProducts').resolves(salesWithProducts);
        const result = await salesProductsService.listSalesWithProducts();
        expect(result).to.be.an('array').equals(salesWithProducts);
      });
    });

  });

});
