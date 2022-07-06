const sinon = require('sinon');
const { expect } = require('chai');
const salesProductsController = require('../../../controllers/salesProductsController');
const salesProductsService = require('../../../services/salesProductsService');
const CustomError = require('../../../errors/CustomError');
const { salesWithProducts, productsFromASale } = require('../mock/data');

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

});
