const salesProductsModel = require('../models/salesProductsModel');

const listSalesWithProducts = async () => {
  const salesWithProducts = await salesProductsModel.listSalesWithProducts();
  return salesWithProducts;
};

const getProductsFromASale = async (saleId) => {
  const productsFromASale = await salesProductsModel.getProductsFromASale(saleId);
  return productsFromASale;
};

module.exports = { listSalesWithProducts, getProductsFromASale };
