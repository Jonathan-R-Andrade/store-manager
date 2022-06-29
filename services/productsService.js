const productsModel = require('../models/productsModel');

const listProducts = async () => {
  const products = await productsModel.listProducts();
  return products;
};

const getProduct = async (id) => {
  const product = await productsModel.getProduct(id);
  return product;
};

module.exports = { listProducts, getProduct };
