const sinon = require('sinon');
const { expect } = require('chai');
const salesController = require('../../../src/controllers/salesController');
const salesService = require('../../../src/services/salesService');
const validations = require('../../../src/services/validations');
const { products, saleWithProducts } = require('../mock/data');

describe('salesController', () => {

  const res = {};
  const req = {};
  res.json = sinon.stub();
  res.end = sinon.stub();
  res.status = sinon.stub().returns(res);

  describe('#addSale', () => {

    describe('ao receber produtos corretos no body da requisição', async () => {
      it('responde com status 201 e os produtos com o id da venda',
        async () => {
          sinon.stub(salesService, 'addSale').resolves(saleWithProducts);
          sinon.stub(validations, 'validateProducts');
          sinon.stub(validations, 'extractProductId');
          sinon.stub(validations, 'validateIfProductsExist');

          req.body = products;

          await salesController.addSale(req, res);
          expect(res.status.calledWithExactly(201)).to.be.true;
          expect(res.json.calledWithExactly(saleWithProducts)).to.be.true;
        });
    });

  });

  describe('#deleteSale', () => {

    describe('se o id estiver correto', async () => {
      it('responde com status 204 e nada no body da resposta',
        async () => {
          sinon.stub(salesService, 'deleteSale').resolves(1);

          req.params = '1';

          await salesController.deleteSale(req, res);
          expect(res.status.calledWithExactly(204)).to.be.true;
          expect(res.end.calledWithExactly()).to.be.true;
        });
    });

  });

});
