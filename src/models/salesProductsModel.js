const connection = require('./connection');
const sqlQueries = require('./sqlQueries');

const addSaleProducts = async (saleId, products) => {
  const tableRows = products
    .map(({ productId, quantity }) => [saleId, productId, quantity]);

  const query = sqlQueries.addSaleProducts(tableRows.length, 3);
  const [{ affectedRows }] = await connection.execute(query, tableRows.flat());
  return affectedRows;
};

const listSalesWithProducts = async () => {
  const query = sqlQueries.listSalesWithProducts();
  const [salesWithProducts] = await connection.execute(query);
  return salesWithProducts;
};

const getProductsFromASale = async (saleId) => {
  const query = sqlQueries.getProductsFromASale();
  const [productsFromASale] = await connection.execute(query, [saleId]);
  return productsFromASale;
};

const updateProductFromASale = async (saleId, productId, quantity) => {
  const query = sqlQueries.updateProductFromASale();
  const [{ affectedRows }] = await connection
    .execute(query, [quantity, saleId, productId]);
  return affectedRows;
};

const checkIfTheSaleExists = async (saleId) => {
  const query = sqlQueries.countUniqueProductsSoldFromASale();
  const [[{ uniqueProductsSold }]] = await connection.execute(query, [saleId]);
  return Boolean(uniqueProductsSold);
};

module.exports = {
  addSaleProducts,
  listSalesWithProducts,
  getProductsFromASale,
  updateProductFromASale,
  checkIfTheSaleExists,
};
