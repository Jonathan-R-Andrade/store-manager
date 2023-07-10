const sinon = require('sinon');
const { expect, use } = require('chai');
const productsController = require('../../../src/controllers/productsController');
const productsService = require('../../../src/services/productsService');
const validations = require('../../../src/services/validations');
const chaiAsPromised = require('chai-as-promised');
const CustomError = require('../../../src/errors/CustomError');
const { products, correctProduct, incorrectProduct } = require('../mock/data');

use(chaiAsPromised);

describe('productsController', () => {

  const res = {};
  const req = {};
  res.json = sinon.stub();
  res.end = sinon.stub();
  res.status = sinon.stub().returns(res);

  afterEach(sinon.restore);

  describe('#getProduct', () => {

    describe('ao receber um id no parâmetro da requisição', async () => {
      it('se invalido lança uma exceção com a mensagem ("id" must be a number)',
        async () => {
          sinon.stub(validations, 'validateId')
            .throws(new CustomError(400, '"id" must be a number'));

          req.params = { id: 'abc' };

          await expect(productsController.getProduct(req, res)).to
            .be.rejectedWith(CustomError, '"id" must be a number');
        });

      it('se valido responde com status 200 e o produto no body da resposta',
        async () => {
          sinon.stub(validations, 'validateId');
          sinon.stub(productsService, 'getProduct').resolves(products[0]);

          req.params = { id: '1' };

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

          await productsController.listProducts(req, res);
          expect(res.status.calledWithExactly(200)).to.be.true;
          expect(res.json.calledWithExactly(products)).to.be.true;
        });
    });

    describe('quando não existe produtos', async () => {
      it('responde com status 200 e um array vazio no body da resposta', async () => {
        sinon.stub(productsService, 'listProducts').resolves([]);

        await productsController.listProducts(req, res);
        expect(res.status.calledWithExactly(200)).to.be.true;
        expect(res.json.calledWithExactly([])).to.be.true;
      });
    });

  });

  describe('#addProduct', () => {

    describe('ao receber um produto correto no body da requisição', async () => {
      it('responde com status 201 e o produto no body da resposta',
        async () => {
          sinon.stub(productsService, 'addProduct').resolves(products[0]);

          req.body = correctProduct;

          await productsController.addProduct(req, res);
          expect(res.status.calledWithExactly(201)).to.be.true;
          expect(res.json.calledWithExactly(products[0])).to.be.true;
        });
    });

    describe('ao receber um produto no body da requisição com', async () => {
      it('o nome ausente, lança uma exceção com a mensagem ("name" is required)',
        async () => {
          req.body = {};

          await expect(productsController.addProduct(req, res)).to.be.rejectedWith(
            CustomError,
            '"name" is required'
          );
        });

      it(`o nome com menos de 5 caracteres, lança uma exceção com a mensagem 
              ("name" length must be at least 5 characters long)`,
        async () => {
          req.body = incorrectProduct;

          await expect(productsController.addProduct(req, res)).to.be.rejectedWith(
            CustomError,
            '"name" length must be at least 5 characters long'
          );
        });
    });

  });

  describe('#updateProduct', () => {

    describe('ao atualizar um produto com sucesso', async () => {
      it('responde com status 200 e o produto no body da resposta', async () => {
        sinon.stub(productsService, 'updateProduct').resolves(products[0]);

        req.params = { id: '1' };
        req.body = correctProduct;

        await productsController.updateProduct(req, res);
        expect(res.status.calledWithExactly(200)).to.be.true;
        expect(res.json.calledWithExactly(products[0])).to.be.true;
      });
    });

    describe('ao receber um id no parâmetro da requisição', async () => {
      it('se invalido lança uma exceção com a mensagem ("id" must be a number)',
        async () => {
          req.params = { id: 'abc' };

          await expect(productsController.updateProduct(req, res)).to
            .be.rejectedWith(CustomError, '"id" must be a number');
        });

      it(`se menor que 1 lança uma exceção com a mensagem
               ("id" must be greater than or equal to 1)`,
        async () => {
          req.params = { id: '0' };

          await expect(productsController.updateProduct(req, res)).to
            .be.rejectedWith(CustomError, '"id" must be greater than or equal to 1');
        });
    });

    describe('ao tentar atualizar um produto que não existe', async () => {
      it('lança uma exceção com a mensagem "Product not found"', async () => {
        sinon.stub(productsService, 'updateProduct')
          .throws(new CustomError(404, 'Product not found'));

        req.params = { id: '5' };
        req.body = correctProduct;

        await expect(productsController.updateProduct(req, res)).to.be.rejectedWith(
          CustomError,
          'Product not found'
        );
      });
    });

    describe('ao receber um produto no body da requisição com', async () => {
      it('o nome ausente, lança uma exceção com a mensagem ("name" is required)',
        async () => {
          req.params = { id: '5' };
          req.body = {};

          await expect(productsController.updateProduct(req, res)).to.be.rejectedWith(
            CustomError,
            '"name" is required'
          );
        });

      it(`o nome com menos de 5 caracteres, lança uma exceção com a mensagem 
              ("name" length must be at least 5 characters long)`,
        async () => {
          req.params = { id: '5' };
          req.body = incorrectProduct;

          await expect(productsController.updateProduct(req, res)).to.be.rejectedWith(
            CustomError,
            '"name" length must be at least 5 characters long'
          );
        });
    });

  });

  describe('#deleteProduct', () => {

    describe('ao deletar um produto com sucesso', async () => {
      it('responde com status 204', async () => {
        sinon.stub(productsService, 'deleteProduct');

        req.params = { id: '1' };

        await productsController.deleteProduct(req, res);
        expect(res.status.calledWithExactly(204)).to.be.true;
      });
    });

    describe('ao receber um id no parâmetro da requisição', async () => {
      it('se invalido lança uma exceção com a mensagem ("id" must be a number)',
        async () => {
          req.params = { id: 'abc' };

          await expect(productsController.deleteProduct(req, res)).to
            .be.rejectedWith(CustomError, '"id" must be a number');
        });

      it(`se menor que 1 lança uma exceção com a mensagem
               ("id" must be greater than or equal to 1)`,
        async () => {
          req.params = { id: '0' };

          await expect(productsController.deleteProduct(req, res)).to
            .be.rejectedWith(CustomError, '"id" must be greater than or equal to 1');
        });
    });

    describe('ao tentar deletar um produto que não existe', async () => {
      it('lança uma exceção com a mensagem "Product not found"', async () => {
        sinon.stub(productsService, 'deleteProduct')
          .throws(new CustomError(404, 'Product not found'));

        req.params = { id: '5' };

        await expect(productsController.deleteProduct(req, res)).to.be.rejectedWith(
          CustomError,
          'Product not found'
        );
      });
    });

  });

  describe('#getProductsBySearchTerm', () => {

    describe('ao pesquisar um produto pelo termo', async () => {
      it(`responde com status 200 e um array no body da resposta
          com os produtos conforme a pesquisa`, async () => {
        sinon.stub(productsService, 'getProductsBySearchTerm').resolves(products);

        req.query = { q: 'S' };

        await productsController.getProductsBySearchTerm(req, res);
        expect(res.status.calledWithExactly(200)).to.be.true;
        expect(res.json.calledWithExactly(products)).to.be.true;
      });
    });

  });

});
