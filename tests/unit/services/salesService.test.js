const sinon = require('sinon');
const { expect } = require('chai');
const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');
const salesProductsModel = require('../../../models/salesProductsModel');

describe('salesService', () => {

  const products = [
    { productId: 1, quantity: 5 },
    { productId: 2, quantity: 3 }
  ];

  describe('#addSale', () => {

    describe('ao adicionar uma venda', async () => {
      it('retorna um objeto com o id da venda e os produtos adicionados', async () => {
        sinon.stub(salesModel, 'addSale').resolves(1);
        sinon.stub(salesProductsModel, 'addSaleProducts').resolves(products);
        const response = await salesService.addSale(products);
        expect(response).to.be.an('object').that.includes({
          id: 1,
          itemsSold: products,
        });
      });
    });

  });

});
