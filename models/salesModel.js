const connection = require('./connection');

const addSale = async () => {
  const query = 'INSERT INTO StoreManager.sales VALUES ()';
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

module.exports = { addSale };
