const productsModel = require('../models/productsModel');
const CustomError = require('../errors/CustomError');

const listProducts = async () => {
  const products = await productsModel.listProducts();
  return products;
};

const getProduct = async (id) => {
  const product = await productsModel.getProduct(id);
  if (!product) throw new CustomError(404, 'Product not found');
  return product;
};

const addProduct = async (product) => {
  const id = await productsModel.addProduct(product);
  return { id, ...product };
};

module.exports = {
  listProducts,
  getProduct,
  addProduct,
};
