const salesService = require('../services/salesService');
const validations = require('../services/validations');

const addSale = async (req, res) => {
  validations.validateProducts(req.body);
  const productsIds = validations.extractProductId(req.body);
  await validations.validateIfProductsExist(productsIds);
  const result = await salesService.addSale(req.body);
  res.status(201).json(result);
};

module.exports = { addSale };
