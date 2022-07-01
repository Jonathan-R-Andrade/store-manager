const connection = require('./connection');

const listProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

const getProduct = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id=?';
  const [[product]] = await connection.execute(query, [id]);
  return product;
};

const addProduct = async (product) => {
  const { name } = product;
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [{ insertId }] = await connection.execute(query, [name]);
  return insertId;
};

const countFoundProducts = async (ids) => {
  const queryValues = ids.map(() => '?').join(',');
  const query = `
    SELECT count('products') AS foundProducts FROM StoreManager.products
    WHERE id in (${queryValues});
  `;
  const [[{ foundProducts }]] = await connection.execute(query, ids);
  return foundProducts;
};

module.exports = { listProducts, getProduct, addProduct, countFoundProducts };
