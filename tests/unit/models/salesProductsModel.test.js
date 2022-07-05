const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesProductsModel = require('../../../models/salesProductsModel');

describe('salesProductsModel', () => {

  afterEach(() => { connection.execute.restore(); });

  const products = [
    { productId: 1, quantity: 5 },
    { productId: 2, quantity: 3 }
  ];

  describe('#addSaleProducts', () => {

    describe('verifica se', async () => {
      it('a função connection.execute é chamada com os argumentos corretos', async () => {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        await salesProductsModel.addSaleProducts(1, [{ productId: 1, quantity: 5 }]);
        const query = 'INSERT INTO StoreManager.sales_products VALUES (?,?,?)';
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

});
