const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesProductsModel = require('../../../models/salesProductsModel');
const sqlQueries = require('./sqlQueries');

describe('salesProductsModel', () => {

  afterEach(() => { connection.execute.restore(); });

  const products = [
    { productId: 1, quantity: 5 },
    { productId: 2, quantity: 3 }
  ];

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
  ];

  const productsFromASale = [
    {
      date: "2022-07-05T19:57:21.000Z",
      productId: 1,
      quantity: 5
    },
    {
      date: "2022-07-05T19:57:21.000Z",
      productId: 2,
      quantity: 10
    }
  ];

  describe('#addSaleProducts', () => {

    describe('verifica se', async () => {
      it('a função connection.execute é chamada com os argumentos corretos', async () => {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        await salesProductsModel.addSaleProducts(1, [{ productId: 1, quantity: 5 }]);
        const query = sqlQueries.addSaleProducts;
        expect(connection.execute.calledWithExactly(query, [1, 1, 5])).to.be.true;
      });
    });

    describe('ao adicionar vendas', async () => {
      it('retorna o número de vendas adicionadas', async () => {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 2 }]);
        const result = await salesProductsModel.addSaleProducts(1, products);
        expect(result).to.be.equals(2);
      });
    });

  });

  describe('#listSalesWithProducts', () => {

    describe('verifica se', async () => {
      it('a função connection.execute é chamada com os argumentos corretos', async () => {
        sinon.stub(connection, 'execute').resolves([salesWithProducts]);
        await salesProductsModel.listSalesWithProducts();
        const query = sqlQueries.listSalesWithProducts;
        expect(connection.execute.calledWithExactly(query)).to.be.true;
      });
    });

    describe('a função', async () => {
      it('deve retorna um array contendo as vendas com os produtos', async () => {
        sinon.stub(connection, 'execute').resolves([salesWithProducts]);
        const result = await salesProductsModel.listSalesWithProducts();
        expect(result).to.be.an('array').equals(salesWithProducts);
      });
    });

  });

  describe('#getProductsFromASale', () => {

    describe('verifica se', async () => {
      it('a função connection.execute é chamada com os argumentos corretos', async () => {
        sinon.stub(connection, 'execute').resolves([productsFromASale]);
        await salesProductsModel.getProductsFromASale(1);
        const query = sqlQueries.getProductsFromASale;
        expect(connection.execute.calledWithExactly(query, [1])).to.be.true;
      });
    });

    describe('a função', async () => {
      it('deve retorna um array contendo os produtos de uma venda', async () => {
        sinon.stub(connection, 'execute').resolves([productsFromASale]);
        const result = await salesProductsModel.getProductsFromASale(1);
        expect(result).to.be.an('array').equals(productsFromASale);
      });
    });

  });

});
