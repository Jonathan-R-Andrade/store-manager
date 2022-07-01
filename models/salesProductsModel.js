const connection = require('./connection');

const addSaleProducts = async (saleId, products) => {
  const tableRows = products
    .map(({ productId, quantity }) => [saleId, productId, quantity]);
  const queryValues = tableRows.map(() => '(?,?,?)').join(',');

  const query = `INSERT INTO StoreManager.sales_products VALUES ${queryValues}`;
  const [{ affectedRows }] = await connection.execute(query, tableRows.flat());
  return affectedRows;
};

module.exports = { addSaleProducts };
