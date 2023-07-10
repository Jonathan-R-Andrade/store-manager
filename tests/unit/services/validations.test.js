const { expect, use } = require('chai');
const CustomError = require('../../../src/errors/CustomError');
const validations = require('../../../src/services/validations');
const productsModel = require('../../../src/models/productsModel');
const salesProductsModel = require('../../../src/models/salesProductsModel');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

use(chaiAsPromised);

describe('validations', () => {

  afterEach(sinon.restore);

  describe('#validateId', () => {

    describe('ao receber um id invalido', async () => {
      it('lança uma exceção com a mensagem ("id" must be a number)', async () => {
        expect(() => validations.validateId('abc')).to
          .throw(CustomError, '"id" must be a number');
      });
    });

    describe('ao receber um id valido', async () => {
      it('não lança exceção', async () => {
        expect(() => validations.validateId(1)).to.not.throw(Error);
      });
    });

  });

  describe('#validateIfProductsExist', () => {

    describe('se algum produto não existe', async () => {
      it('lança uma exceção com a mensagem "Product not found"', async () => {
        sinon.stub(productsModel, 'countFoundProducts').resolves(1);

        await expect(validations.validateIfProductsExist([1, 2]))
          .to.be.rejectedWith(CustomError, 'Product not found');
      });
    });

    describe('se todos os produtos existem', async () => {
      it('não lança exceção', async () => {
        sinon.stub(productsModel, 'countFoundProducts').resolves(2);

        await expect(validations.validateIfProductsExist([1, 2]))
          .not.to.be.rejectedWith(Error);
      });
    });

  });

  describe('#validateIfExistsSaleOfProducts', () => {

    describe('se a venda não existe', async () => {
      it('lança uma exceção com a mensagem "Sale not found"', async () => {
        sinon.stub(salesProductsModel, 'checkIfExistsSaleOfProducts').resolves(false);

        await expect(validations.validateIfExistsSaleOfProducts(999))
          .to.be.rejectedWith(CustomError, 'Sale not found');
      });
    });

    describe('se a venda existe', async () => {
      it('não lança exceção', async () => {
        sinon.stub(salesProductsModel, 'checkIfExistsSaleOfProducts').resolves(true);

        await expect(validations.validateIfExistsSaleOfProducts(1))
          .not.to.be.rejectedWith(Error);
      });
    });

  });

});
