const salesModel = require('../models/salesModel');
const salesProductsModel = require('../models/salesProductsModel');

const addSale = async (products) => {
  const saleId = await salesModel.addSale();
  await salesProductsModel.addSaleProducts(saleId, products);
  return { id: saleId, itemsSold: products };
};

module.exports = { addSale };
