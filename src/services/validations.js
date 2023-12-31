const Joi = require('joi');
const productsModel = require('../models/productsModel');
const salesProductsModel = require('../models/salesProductsModel');
const CustomError = require('../errors/CustomError');
const validateSchema = require('./validateSchema');

const validateId = (id) => {
  const schema = Joi.number().label('id').min(1);
  validateSchema(schema, id);
};

const validateProduct = (product) => {
  const schemaRequired = Joi.object({ name: Joi.string().required() })
    .label('product').required();
  const schemaMin = Joi.object({ name: Joi.string().min(5) })
    .label('product').required();
  validateSchema(schemaRequired, product, 400);
  validateSchema(schemaMin, product, 422);
};

const validateProducts = (products) => {
  const schema = Joi.array().min(1).required().label('products');
  validateSchema(schema, products, 400);

  const schemaRequired = Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().required(),
  }).label('product');

  const schemaMin = Joi.object({
    productId: Joi.number().min(1),
    quantity: Joi.number().min(1),
  }).label('product');

  products.forEach((product) => {
    validateSchema(schemaRequired, product, 400);
    validateSchema(schemaMin, product, 422);
  });
};

const validateIfProductsExist = async (productsIds) => {
  const totalProductsFound = await productsModel.countFoundProducts(productsIds);
  if (productsIds.length !== totalProductsFound) {
    throw new CustomError(404, 'Product not found');
  }
};

const validateIfTheSaleExists = async (saleId) => {
  const exists = await salesProductsModel.checkIfTheSaleExists(saleId);
  if (!exists) throw new CustomError(404, 'Sale not found');
};

const extractProductId = (products) => products.map(({ productId }) => productId);

module.exports = {
  validateId,
  validateProduct,
  validateProducts,
  validateIfProductsExist,
  validateIfTheSaleExists,
  extractProductId,
};
