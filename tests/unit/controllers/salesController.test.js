const sinon = require('sinon');
const { expect } = require('chai');
const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');
const validations = require('../../../services/validations');

describe('salesController', () => {

  const res = {};
  const req = {};
  res.json = sinon.stub();
  res.status = sinon.stub().returns(res);

  const products = [
    { productId: 1, quantity: 5 },
    { productId: 2, quantity: 3 }
  ];

  const saleWithProducts = {
    id: 1,
    itemsSold: products,
  };

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

});
