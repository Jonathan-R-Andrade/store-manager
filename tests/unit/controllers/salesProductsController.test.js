const sinon = require('sinon');
const { expect } = require('chai');
const salesProductsController = require('../../../src/controllers/salesProductsController');
const salesProductsService = require('../../../src/services/salesProductsService');
const validations = require('../../../src/services/validations');
const CustomError = require('../../../src/errors/CustomError');
const {
  salesWithProducts,
  productsFromASale,
  saleWithUpdatedProducts,
  updatedProducts,
} = require('../mock/data');

describe('salesProductsService', () => {

  const res = {};
  const req = {};
  res.json = sinon.stub();
  res.status = sinon.stub().returns(res);

  afterEach(sinon.restore);

  describe('#listSalesWithProducts', () => {

    describe('quando existe vendas com produtos', async () => {
      it('responde com status 200 e um array com os dados no body da resposta',
        async () => {
          sinon.stub(salesProductsService, 'listSalesWithProducts')
            .resolves(salesWithProducts);

          await salesProductsController.listSalesWithProducts(req, res);
          expect(res.status.calledWithExactly(200)).to.be.true;
          expect(res.json.calledWithExactly(salesWithProducts)).to.be.true;
        });
    });

    describe('quando não existe vendas com produtos', async () => {
      it('responde com status 200 e um array vazio no body da resposta', async () => {
        sinon.stub(salesProductsService, 'listSalesWithProducts').resolves([]);

        await salesProductsController.listSalesWithProducts(req, res);
        expect(res.status.calledWithExactly(200)).to.be.true;
        expect(res.json.calledWithExactly([])).to.be.true;
      });
    });

  });

  describe('#getProductsFromASale', () => {

    describe('se a venda existe', async () => {
      it('responde com status 200 e os produtos no body da resposta', async () => {
        sinon.stub(salesProductsService, 'getProductsFromASale')
          .resolves(productsFromASale);

        req.params = { id: '1' };

        await salesProductsController.getProductsFromASale(req, res);
        expect(res.status.calledWithExactly(200)).to.be.true;
        expect(res.json.calledWithExactly(productsFromASale)).to.be.true;
      });
    });

    describe('se a venda não existe', async () => {
      it('lança uma exceção com a mensagem "Sale not found"', async () => {
        sinon.stub(salesProductsService, 'getProductsFromASale')
          .throws(new CustomError(404, 'Sale not found'));

        req.params = { id: '5' };

        await expect(salesProductsController.getProductsFromASale(req, res))
          .to.be.rejectedWith(CustomError, 'Sale not found');
      });
    });

  });

  describe('#updateProductsFromASale', () => {

    describe('se a venda e os produtos existem e estão corretos', async () => {
      it('responde com status 200 e a venda com os produtos atualizados', async () => {
        sinon.stub(validations, 'validateIfTheSaleExists');
        sinon.stub(validations, 'validateIfProductsExist');
        sinon.stub(salesProductsService, 'updateProductsFromASale').resolves(saleWithUpdatedProducts);

        req.params = { id: '1' };
        req.body = updatedProducts;

        await salesProductsController.updateProductsFromASale(req, res);
        expect(res.status.calledWithExactly(200)).to.be.true;
        expect(res.json.calledWithExactly(saleWithUpdatedProducts)).to.be.true;
      });
    });

    describe('se a venda não existe', async () => {
      it('lança uma exceção com a mensagem "Sale not found"', async () => {
        sinon.stub(validations, 'validateIfTheSaleExists')
          .throws(new CustomError(404, 'Sale not found'));
        sinon.stub(validations, 'validateIfProductsExist');

        req.params = { id: '999' };
        req.body = updatedProducts;

        await expect(salesProductsController.updateProductsFromASale(req, res))
          .to.be.rejectedWith(CustomError, 'Sale not found');
      });
    });

    describe('se algum produto não existe', async () => {
      it('lança uma exceção com a mensagem "Product not found"', async () => {
        sinon.stub(validations, 'validateIfTheSaleExists');
        sinon.stub(validations, 'validateIfProductsExist')
          .throws(new CustomError(404, 'Product not found'));

        req.params = { id: '1' };
        req.body = updatedProducts;

        await expect(salesProductsController.updateProductsFromASale(req, res))
          .to.be.rejectedWith(CustomError, 'Product not found');
      });
    });

  });

});
