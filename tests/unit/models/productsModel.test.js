const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');
const sqlQueries = require('./sqlQueries');
const { products, correctProduct } = require('../mock/data');

describe('productsModel', () => {

  afterEach(() => { connection.execute.restore(); });

  describe('#getProduct', () => {

    describe('verifica se', async () => {
      it('a função connection.execute é chamada com os argumentos corretos', async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
        await productsModel.getProduct(1);
        const query = sqlQueries.getProduct;
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
        const query = sqlQueries.listProducts;
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
        const query = sqlQueries.addProduct;
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

  describe('#updateProduct', () => {

    describe('verifica se', async () => {
      it('a função connection.execute é chamada com os argumentos corretos', async () => {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        const { name } = correctProduct;
        await productsModel.updateProduct(1, name);
        const query = sqlQueries.updateProduct;
        expect(connection.execute.calledWithExactly(query, [name, 1])).to.be.true;
      });
    });

    describe('ao atualizar um produto', async () => {
      it('retorna 1', async () => {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        const { name } = correctProduct;
        const response = await productsModel.updateProduct(1, name);
        expect(response).to.be.equal(1);
      });
    });

    describe('se o produto não existe', async () => {
      it('retorna 0', async () => {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);
        const { name } = correctProduct;
        const response = await productsModel.updateProduct(0, name);
        expect(response).to.be.equal(0);
      });
    });

  });

  describe('#deleteProduct', () => {

    describe('verifica se', async () => {
      it('a função connection.execute é chamada com os argumentos corretos', async () => {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        const { name } = correctProduct;
        await productsModel.deleteProduct(1);
        const query = sqlQueries.deleteProduct;
        expect(connection.execute.calledWithExactly(query, [1])).to.be.true;
      });
    });

    describe('ao deletar um produto', async () => {
      it('retorna 1', async () => {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        const response = await productsModel.deleteProduct(1);
        expect(response).to.be.equal(1);
      });
    });

    describe('se o produto não existe', async () => {
      it('retorna 0', async () => {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);
        const response = await productsModel.updateProduct(5);
        expect(response).to.be.equal(0);
      });
    });

  });

  describe('#getProductsBySearchTerm', () => {

    describe('verifica se', async () => {
      it('a função connection.execute é chamada com os argumentos corretos', async () => {
        sinon.stub(connection, 'execute').resolves([products]);
        await productsModel.getProductsBySearchTerm('S');
        const query = sqlQueries.getProductsBySearchTerm;
        expect(connection.execute.calledWithExactly(query, ['%S%'])).to.be.true;
      });
    });

    describe('ao pesquisar um produto', async () => {
      it('retorna um array com os produtos de acordo com a pesquisa', async () => {
        sinon.stub(connection, 'execute').resolves([products]);
        const response = await productsModel.getProductsBySearchTerm('S');
        expect(response).to.be.an('array').equals(products);
      });
    });

  });

  describe('#countFoundProducts', () => {

    describe('verifica se', async () => {
      it('a função connection.execute é chamada com os argumentos corretos', async () => {
        sinon.stub(connection, 'execute').resolves([[{ foundProducts: 2 }]]);
        await productsModel.countFoundProducts([1, 2]);
        const query = sqlQueries.countFoundProducts;
        expect(connection.execute.calledWithExactly(query, [1, 2])).to.be.true;
      });
    });

    describe('ao procurar 2 produtos que existem', async () => {
      it('retorna o valor 2 referente a quantidade de produtos encontrados',
        async () => {
          sinon.stub(connection, 'execute').resolves([[{ foundProducts: 2 }]]);
          const response = await productsModel.countFoundProducts([1, 2]);
          expect(response).to.be.equals(2);
        });
    });

  });

});
