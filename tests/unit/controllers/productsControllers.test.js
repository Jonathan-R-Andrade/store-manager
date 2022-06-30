const sinon = require('sinon');
const { expect, use } = require('chai');
const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');
const chaiAsPromised = require('chai-as-promised');
const CustomError = require('../../../errors/CustomError');

use(chaiAsPromised);

describe('productsController', () => {

  afterEach(sinon.restore);
  const products = [{ id: 1, name: 'PS5' }, { id: 2, name: 'Xbox SX' }];

  const req = {}
  const res = {};

  describe('#getProduct', () => {

    describe('ao receber um id no parâmetro da requisição', async () => {
      it('se invalido lança uma exceção com a mensagem ("id" must be a number)',
        async () => {
          sinon.stub(productsService, 'validateId')
            .throws(new CustomError(400, '"id" must be a number'));

          req.params = { id: 'abc' };

          await expect(productsController.getProduct(req, res)).to
            .be.rejectedWith(CustomError, '"id" must be a number');
        });

      it('se valido responde com status 200 e o produto no body da resposta',
        async () => {
          sinon.stub(productsService, 'validateId');
          sinon.stub(productsService, 'getProduct').resolves(products[0]);

          req.params = { id: '1' };
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          await productsController.getProduct(req, res);
          expect(res.status.calledWithExactly(200)).to.be.true;
          expect(res.json.calledWithExactly(products[0])).to.be.true;
        });
    });

  });

  describe('#listProducts', () => {

    describe('quando existe produtos', async () => {
      it('responde com status 200 e um array com os produtos no body da resposta',
        async () => {
          sinon.stub(productsService, 'listProducts').resolves(products);

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          await productsController.listProducts(req, res);
          expect(res.status.calledWithExactly(200)).to.be.true;
          expect(res.json.calledWithExactly(products)).to.be.true;
        });
    });

    describe('quando não existe produtos', async () => {
      it('responde com status 200 e um array vazio no body da resposta', async () => {
        sinon.stub(productsService, 'listProducts').resolves([]);

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        await productsController.listProducts(req, res);
        expect(res.status.calledWithExactly(200)).to.be.true;
        expect(res.json.calledWithExactly([])).to.be.true;
      });
    });

  });

});
