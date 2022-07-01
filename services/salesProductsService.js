const CustomError = require('../errors/CustomError');
const salesProductsModel = require('../models/salesProductsModel');

const listSalesWithProducts = async () => {
  const salesWithProducts = await salesProductsModel.listSalesWithProducts();
  return salesWithProducts;
};

const getProductsFromASale = async (saleId) => {
  const productsFromASale = await salesProductsModel.getProductsFromASale(saleId);
  if (!productsFromASale.length) throw new CustomError(404, 'Sale not found');
  return productsFromASale;
};

module.exports = { listSalesWithProducts, getProductsFromASale };
