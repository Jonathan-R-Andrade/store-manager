const joi = require('joi');
const productsModel = require('../models/productsModel');
const CustomError = require('../errors/CustomError');
const validateSchema = require('./validateSchema');

const validateId = (id) => {
  const schema = joi.number().label('id').min(1);
  validateSchema(schema, id);
};

const validateProduct = (product) => {
  const schemaRequired = joi.object({ name: joi.string().required() }).label('product');
  const schemaMin = joi.object({ name: joi.string().min(5) }).label('product');
  validateSchema(schemaRequired, product, 400);
  validateSchema(schemaMin, product, 422);
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

const addProduct = async (product) => {
  const id = await productsModel.addProduct(product);
  return { id, ...product };
};

module.exports = { validateId, validateProduct, listProducts, getProduct, addProduct };
