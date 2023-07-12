const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const salesProductsModel = require('../../../src/models/salesProductsModel');
const sqlQueries = require('./sqlQueries');
const { products, salesWithProducts, productsFromASale } = require('../mock/data');

describe('salesProductsModel', () => {

  afterEach(() => { connection.execute.restore(); });

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

  describe('#updateProductFromASale', () => {

    describe('verifica se', async () => {
      it('a função connection.execute é chamada com os argumentos corretos', async () => {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        await salesProductsModel.updateProductFromASale(1, 2, 3);
        const query = sqlQueries.updateProductFromASale;
        expect(connection.execute.calledWithExactly(query, [3, 1, 2])).to.be.true;
      });
    });

    describe('ao atualizar um produto', async () => {
      it('retorna 1', async () => {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        const result = await salesProductsModel.updateProductFromASale(1, 2, 3);
        expect(result).to.be.equals(1);
      });
    });

  });

  describe('#checkIfTheSaleExists', () => {

    describe('verifica se', async () => {
      it('a função connection.execute é chamada com os argumentos corretos', async () => {
        sinon.stub(connection, 'execute').resolves([[{ uniqueProductsSold: 1 }]]);
        await salesProductsModel.checkIfTheSaleExists(1);
        const query = sqlQueries.countUniqueProductsSoldFromASale;
        expect(connection.execute.calledWithExactly(query, [1])).to.be.true;
      });
    });

    describe('ao verificar que existe venda com o id informado', async () => {
      it('retorna true', async () => {
        sinon.stub(connection, 'execute').resolves([[{ uniqueProductsSold: 1 }]]);
        const result = await salesProductsModel.checkIfTheSaleExists(1);
        expect(result).to.be.true;
      });
    });

    describe('ao verificar que não existe venda com o id informado', async () => {
      it('retorna false', async () => {
        sinon.stub(connection, 'execute').resolves([[{ uniqueProductsSold: 0 }]]);
        const result = await salesProductsModel.checkIfTheSaleExists(1);
        expect(result).to.be.false;
      });
    });

  });

});
