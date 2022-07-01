const salesService = require('../services/salesService');
const productsService = require('../services/productsService');

const addSale = async (req, res) => {
  salesService.validateProducts(req.body);
  const productsIds = productsService.extractProductId(req.body);
  await productsService.validateIfProductsExist(productsIds);
  const result = await salesService.addSale(req.body);
  res.status(201).json(result);
};

module.exports = { addSale };
