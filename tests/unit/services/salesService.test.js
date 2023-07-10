const sinon = require('sinon');
const { expect } = require('chai');
const salesService = require('../../../src/services/salesService');
const salesModel = require('../../../src/models/salesModel');
const salesProductsModel = require('../../../src/models/salesProductsModel');
const { products } = require('../mock/data');
const CustomError = require('../../../src/errors/CustomError');

describe('salesService', () => {

  afterEach(sinon.restore);

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

  describe('#deleteSale', () => {

    describe('ao deletar uma venda', async () => {
      it('se a venda existe retorna 1', async () => {
        sinon.stub(salesModel, 'deleteSale').resolves(1);
        const response = await salesService.deleteSale(1);
        expect(response).to.be.equals(1);
      });

      it(`se a venda não existe lança uma exceção com a mensagem "Sale not found"`,
        async () => {
          sinon.stub(salesModel, 'deleteSale').resolves(0);
          await expect(salesService.deleteSale(999))
            .to.be.rejectedWith(CustomError, 'Sale not found');
        });
    });

  });

});
