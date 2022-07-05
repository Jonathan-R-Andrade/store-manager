const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('salesModel', () => {

  afterEach(() => { connection.execute.restore(); });

  describe('#addSale', () => {

    describe('verifica se', async () => {
      it('a função connection.execute é chamada com os argumentos corretos', async () => {
        sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
        await salesModel.addSale();
        const query = 'INSERT INTO StoreManager.sales VALUES ()';
        expect(connection.execute.calledWithExactly(query)).to.be.true;
      });
    });

    describe('ao adicionar uma venda', async () => {
      it('retorna o id da mesma', async () => {
        sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
        const response = await salesModel.addSale();
        expect(response).to.be.equal(1);
      });
    });

  });

});