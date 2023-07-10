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

const getProductsBySearchTerm = async (searchTerm) => {
  const products = await productsModel.getProductsBySearchTerm(searchTerm);
  return products;
};

const addProduct = async (product) => {
  const id = await productsModel.addProduct(product);
  return { id, ...product };
};

const updateProduct = async (id, { name }) => {
  const affectedProducts = await productsModel.updateProduct(id, name);
  if (!affectedProducts) throw new CustomError(404, 'Product not found');
  return { id, name };
};

const deleteProduct = async (id) => {
  const affectedProducts = await productsModel.deleteProduct(id);
  if (!affectedProducts) throw new CustomError(404, 'Product not found');
};

module.exports = {
  listProducts,
  getProduct,
  getProductsBySearchTerm,
  addProduct,
  updateProduct,
  deleteProduct,
};
