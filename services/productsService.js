const joi = require('joi');
const productsModel = require('../models/productsModel');
const CustomError = require('../errors/CustomError');
const validateSchema = require('./validateSchema');

const validateId = (id) => {
  const schema = joi.number().label('id').min(1);
  validateSchema(schema, id);
};

const listProducts = async () => {
  const products = await productsModel.listProducts();
  return products;
};

const getProduct = async (id) => {
  const product = await productsModel.getProduct(id);
  if (!product) throw new CustomError(404, 'Product not found');
  return product;
};

module.exports = { validateId, listProducts, getProduct };
