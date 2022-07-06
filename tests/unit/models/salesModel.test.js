const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');
const sqlQueries = require('./sqlQueries');

describe('salesModel', () => {

  afterEach(() => { connection.execute.restore(); });

  describe('#addSale', () => {

    describe('verifica se', async () => {
      it('a função connection.execute é chamada com os argumentos corretos', async () => {
        sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
        await salesModel.addSale();
        const query = sqlQueries.addSale;
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

  describe('#deleteSale', () => {

    describe('verifica se', async () => {
      it('a função connection.execute é chamada com os argumentos corretos', async () => {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        await salesModel.deleteSale(1);
        const query = sqlQueries.deleteSale;
        expect(connection.execute.calledWithExactly(query, [1])).to.be.true;
      });
    });

    describe('ao deletar uma venda', async () => {
      it('retorna 1', async () => {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        const response = await salesModel.deleteSale(1);
        expect(response).to.be.equal(1);
      });
    });

    describe('ao tentar deletar uma venda que não existe', async () => {
      it('retorna 0', async () => {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);
        const response = await salesModel.deleteSale(999);
        expect(response).to.be.equal(0);
      });
    });

  });

});
