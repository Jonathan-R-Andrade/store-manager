const { expect } = require('chai');
const CustomError = require('../../../errors/CustomError');
const validations = require('../../../services/validations');

describe('validations', () => {

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

});
