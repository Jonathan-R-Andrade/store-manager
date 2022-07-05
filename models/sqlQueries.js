const makeQuestionMarks = (total) => new Array(total).fill('?').join(',');
const makeRows = (totalRows, totalColumns) => new Array(totalRows)
  .fill(`(${makeQuestionMarks(totalColumns)})`).join(',');

const sqlQueries = {
  // productsModel queries
  listProducts: () => 'SELECT * FROM StoreManager.products',
  getProduct: () => 'SELECT * FROM StoreManager.products WHERE id=?',
  addProduct: () => 'INSERT INTO StoreManager.products (name) VALUES (?)',
  updateProduct: () => 'UPDATE StoreManager.products SET name=? WHERE id=?',
  deleteProduct: () => 'DELETE FROM StoreManager.products WHERE id=?',
  countFoundProducts: (totalIds) => `
    SELECT count('products') AS foundProducts FROM StoreManager.products
    WHERE id in (${makeQuestionMarks(totalIds)});
  `,

  // salesModel queries
  addSale: () => 'INSERT INTO StoreManager.sales VALUES ()',

  // salesProductsModel queries
  addSaleProducts: (totalRows, totalColumns) =>
    `INSERT INTO StoreManager.sales_products VALUES ${makeRows(totalRows, totalColumns)}`,
  listSalesWithProducts: () => `
    SELECT s.id AS saleId, s.date, p.id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.products AS p
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id AND sp.product_id = p.id
    ORDER BY s.id ASC, p.id ASC;
  `,
  getProductsFromASale: () => `
    SELECT s.date, p.id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.products AS p
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id AND sp.product_id = p.id
    WHERE s.id = ?;
  `,
};

module.exports = sqlQueries;
