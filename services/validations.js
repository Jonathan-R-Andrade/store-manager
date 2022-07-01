const Joi = require('joi');
const productsModel = require('../models/productsModel');
const CustomError = require('../errors/CustomError');
const validateSchema = require('./validateSchema');

const validateId = (id) => {
  const schema = Joi.number().label('id').min(1);
  validateSchema(schema, id);
};

const validateProduct = (product) => {
  const schemaRequired = Joi.object({ name: Joi.string().required() }).label('product');
  const schemaMin = Joi.object({ name: Joi.string().min(5) }).label('product');
  validateSchema(schemaRequired, product, 400);
  validateSchema(schemaMin, product, 422);
};

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

const validateIfProductsExist = async (productsIds) => {
  const totalProductsFound = await productsModel.countFoundProducts(productsIds);
  if (productsIds.length !== totalProductsFound) {
    throw new CustomError(404, 'Product not found');
  }
};

const extractProductId = (products) => products.map(({ productId }) => productId);

module.exports = {
  validateId,
  validateProduct,
  validateProducts,
  validateIfProductsExist,
  extractProductId,
};
