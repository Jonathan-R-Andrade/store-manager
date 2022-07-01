const salesProductsService = require('../services/salesProductsService');
const productsService = require('../services/productsService');

const listSalesWithProducts = async (_req, res) => {
  const salesWithProducts = await salesProductsService.listSalesWithProducts();
  res.status(200).json(salesWithProducts);
};

const getProductsFromASale = async (req, res) => {
  const { id } = req.params;
  productsService.validateId(id);
  const productsFromASale = await salesProductsService.getProductsFromASale(id);
  res.status(200).json(productsFromASale);
};

module.exports = { listSalesWithProducts, getProductsFromASale };
