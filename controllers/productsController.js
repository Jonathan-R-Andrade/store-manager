const productsService = require('../services/productsService');

const listProducts = async (_req, res) => {
  const products = await productsService.listProducts();
  res.status(200).json(products);
};

const getProduct = async (req, res) => {
  productsService.validateId(req.params.id);
  const product = await productsService.getProduct(req.params.id);
  res.status(200).json(product);
};

module.exports = { listProducts, getProduct };
