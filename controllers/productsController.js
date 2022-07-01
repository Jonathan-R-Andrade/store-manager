const productsService = require('../services/productsService');
const validations = require('../services/validations');

const listProducts = async (_req, res) => {
  const products = await productsService.listProducts();
  res.status(200).json(products);
};

const getProduct = async (req, res) => {
  validations.validateId(req.params.id);
  const product = await productsService.getProduct(req.params.id);
  res.status(200).json(product);
};

const addProduct = async (req, res) => {
  validations.validateProduct(req.body);
  const product = await productsService.addProduct(req.body);
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  validations.validateId(req.params.id);
  validations.validateProduct(req.body);
  const product = await productsService.updateProduct(req.params.id, req.body);
  res.status(200).json(product);
};

module.exports = { listProducts, getProduct, addProduct, updateProduct };
