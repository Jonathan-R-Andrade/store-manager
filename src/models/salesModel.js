const connection = require('./connection');
const sqlQueries = require('./sqlQueries');

const addSale = async () => {
  const query = sqlQueries.addSale();
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

const deleteSale = async (id) => {
  const query = sqlQueries.deleteSale();
  const [{ affectedRows }] = await connection.execute(query, [id]);
  return affectedRows;
};

module.exports = { addSale, deleteSale };
