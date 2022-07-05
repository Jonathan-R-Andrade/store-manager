const connection = require('./connection');
const sqlQueries = require('./sqlQueries');

const listProducts = async () => {
  const query = sqlQueries.listProducts();
  const [products] = await connection.execute(query);
  return products;
};

const getProduct = async (id) => {
  const query = sqlQueries.getProduct();
  const [[product]] = await connection.execute(query, [id]);
  return product;
};

const addProduct = async (product) => {
  const { name } = product;
  const query = sqlQueries.addProduct();
  const [{ insertId }] = await connection.execute(query, [name]);
  return insertId;
};

const countFoundProducts = async (ids) => {
  const query = sqlQueries.countFoundProducts(ids.length);
  const [[{ foundProducts }]] = await connection.execute(query, ids);
  return foundProducts;
};

const updateProduct = async (id, name) => {
  const query = sqlQueries.updateProduct();
  const [{ affectedRows }] = await connection.execute(query, [name, id]);
  return affectedRows;
};

const deleteProduct = async (id) => {
  const query = sqlQueries.deleteProduct();
  const [{ affectedRows }] = await connection.execute(query, [id]);
  return affectedRows;
};

module.exports = {
  listProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  countFoundProducts,
};
