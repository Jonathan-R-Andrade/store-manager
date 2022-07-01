const connection = require('./connection');

const addSaleProducts = async (saleId, products) => {
  const tableRows = products
    .map(({ productId, quantity }) => [saleId, productId, quantity]);
  const queryValues = tableRows.map(() => '(?,?,?)').join(',');

  const query = `INSERT INTO StoreManager.sales_products VALUES ${queryValues}`;
  const [{ affectedRows }] = await connection.execute(query, tableRows.flat());
  return affectedRows;
};

const listSalesWithProducts = async () => {
  const query = `
    SELECT s.id AS saleId, s.date, p.id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.products AS p
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id AND sp.product_id = p.id
    ORDER BY s.id ASC, p.id ASC;
  `;
  const [salesWithProducts] = await connection.execute(query);
  return salesWithProducts;
};

const getProductsFromASale = async (saleId) => {
  const query = `
    SELECT s.date, p.id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.products AS p
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id AND sp.product_id = p.id
    WHERE s.id = ?;
  `;
  const [productsFromASale] = await connection.execute(query, [saleId]);
  return productsFromASale;
};

module.exports = { addSaleProducts, listSalesWithProducts, getProductsFromASale };
