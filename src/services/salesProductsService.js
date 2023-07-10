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

const updateProductsFromASale = async (saleId, products) => {
  const promises = products.map(({ productId, quantity }) =>
    salesProductsModel.updateProductFromASale(saleId, productId, quantity));
  await Promise.all(promises);
  return { saleId, itemsUpdated: products };
};

module.exports = {
  listSalesWithProducts,
  getProductsFromASale,
  updateProductsFromASale,
};
