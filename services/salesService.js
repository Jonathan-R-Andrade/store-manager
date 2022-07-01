const Joi = require('joi');
const salesModel = require('../models/salesModel');
const salesProductsModel = require('../models/salesProductsModel');
const validateSchema = require('./validateSchema');

const validateProducts = (products) => {
  const schemaRequired = Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().required(),
  }).label('products');

  const schemaMin = Joi.object({
    productId: Joi.number().min(1),
    quantity: Joi.number().min(1),
  }).label('products');

  products.forEach((product) => {
    validateSchema(schemaRequired, product, 400);
    validateSchema(schemaMin, product, 422);
  });
};

const addSale = async (products) => {
  const saleId = await salesModel.addSale();
  await salesProductsModel.addSaleProducts(saleId, products);
  return { id: saleId, itemsSold: products };
};

module.exports = { validateProducts, addSale };
