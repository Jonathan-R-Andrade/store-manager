const sinon = require('sinon');
const { expect } = require('chai');
const salesProductsController = require('../../../controllers/salesProductsController');
const salesProductsService = require('../../../services/salesProductsService');

describe('salesProductsService', () => {

  const res = {};
  const req = {};
  res.json = sinon.stub();
  res.status = sinon.stub().returns(res);

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
  ]

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

});
