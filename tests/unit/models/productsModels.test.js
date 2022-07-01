const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('productsModel', () => {

  afterEach(() => { connection.execute.restore(); });
  const correctProduct = { name: 'PlayStation 5' };
  const products = [
    { id: 1, name: 'PlayStation 5' },
    { id: 2, name: 'Xbox Series X' }
  ];

  describe('#getProduct', () => {

    describe('verifica se', async () => {
      it('a função connection.execute é chamada com os argumentos corretos', async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
        await productsModel.getProduct(1);
        const query = 'SELECT * FROM StoreManager.products WHERE id=?';
        expect(connection.execute.calledWithExactly(query, [1])).to.be.true;
      });
    });

    describe('quando o produto existe', async () => {
      it('retorna o produto correspondente ao id', async () => {
        sinon.stub(connection, 'execute').resolves([[products[0]]]);
        const response = await productsModel.getProduct('');
        expect(response).to.be.an('object').equal(products[0]);
      });
    });

    describe('quando o produto não existe', async () => {
      it('retorna undefined', async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
        const response = await productsModel.getProduct(1);
        expect(response).to.be.undefined;
      });
    });

  });

  describe('#listProducts', () => {

    describe('verifica se', async () => {
      it('a função connection.execute é chamada com os argumentos corretos', async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
        await productsModel.listProducts();
        const query = 'SELECT * FROM StoreManager.products';
        expect(connection.execute.calledWithExactly(query)).to.be.true;
      });
    });

    describe('quando existe produtos', async () => {
      it('retorna um array com os produtos', async () => {
        sinon.stub(connection, 'execute').resolves([products]);
        const response = await productsModel.listProducts();
        expect(response).to.be.an('array').to.be.equals(products);
      });
    });

    describe('quando não existe produtos', async () => {
      it('retorna um array vazio', async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
        const response = await productsModel.listProducts();
        expect(response).to.be.an('array').that.is.empty;
      });
    });

  });

  describe('#addProduct', () => {

    describe('verifica se', async () => {
      it('a função connection.execute é chamada com os argumentos corretos', async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
        await productsModel.addProduct(correctProduct);
        const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
        const { name } = correctProduct;
        expect(connection.execute.calledWithExactly(query, [name])).to.be.true;
      });
    });

    describe('ao adicionar o produto', async () => {
      it('retorna o id do mesmo', async () => {
        sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
        const response = await productsModel.addProduct(correctProduct);
        expect(response).to.be.equal(1);
      });
    });

  });

});
