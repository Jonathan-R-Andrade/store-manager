const salesService = require('../services/salesService');
const validations = require('../services/validations');

const addSale = async (req, res) => {
  validations.validateProducts(req.body);
  const productsIds = validations.extractProductId(req.body);
  await validations.validateIfProductsExist(productsIds);
  const result = await salesService.addSale(req.body);
  res.status(201).json(result);
};

const deleteSale = async (req, res) => {
  validations.validateId(req.params.id);
  await salesService.deleteSale(req.params.id);
  res.status(204).end();
};

module.exports = { addSale, deleteSale };
