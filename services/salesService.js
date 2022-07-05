const CustomError = require('../errors/CustomError');
const salesModel = require('../models/salesModel');
const salesProductsModel = require('../models/salesProductsModel');

const addSale = async (products) => {
  const saleId = await salesModel.addSale();
  await salesProductsModel.addSaleProducts(saleId, products);
  return { id: saleId, itemsSold: products };
};

const deleteSale = async (id) => {
  const affectedSales = await salesModel.deleteSale(id);
  if (!affectedSales) throw new CustomError(404, 'Sale not found');
  return affectedSales;
};

module.exports = { addSale, deleteSale };
