const connection = require('./connection');
const sqlQueries = require('./sqlQueries');

const addSale = async () => {
  const query = sqlQueries.addSale();
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

module.exports = { addSale };
