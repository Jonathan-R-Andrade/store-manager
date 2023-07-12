// Returns a string of question marks separated by commas,
// ex: makeQuestionMarks(3) returns '?,?,?'
const makeQuestionMarks = (total) => new Array(total).fill('?').join(',');
// Returns a string of question marks separated by commas within parentheses
// separated by commas, ex: makeRows(3, 2) returns '(?,?),(?,?),(?,?)'
const makeRows = (totalRows, totalColumns) =>
  new Array(totalRows).fill(`(${makeQuestionMarks(totalColumns)})`).join(',');

const databaseName = process.env.MYSQL_DATABASE;

const sqlQueries = {
  // products queries
  listProducts: () => `SELECT * FROM ${databaseName}.products`,
  getProduct: () => `SELECT * FROM ${databaseName}.products WHERE id=?`,
  addProduct: () => `INSERT INTO ${databaseName}.products (name) VALUES (?)`,
  updateProduct: () => `UPDATE ${databaseName}.products SET name=? WHERE id=?`,
  deleteProduct: () => `DELETE FROM ${databaseName}.products WHERE id=?`,
  countFoundProducts: (totalIds) => `
    SELECT count('products') AS foundProducts FROM ${databaseName}.products
    WHERE id IN (${makeQuestionMarks(totalIds)});
  `,
  getProductsBySearchTerm: () => `
    SELECT * FROM ${databaseName}.products
    WHERE name LIKE ?;
  `,

  // sales queries
  addSale: () => `INSERT INTO ${databaseName}.sales VALUES ()`,
  deleteSale: () => `DELETE FROM ${databaseName}.sales WHERE id=?`,

  // product_id queries
  addSaleProducts: (totalRows, totalColumns) => `
    INSERT INTO ${databaseName}.sales_products
    VALUES ${makeRows(totalRows, totalColumns)}
  `,
  listSalesWithProducts: () => `
    SELECT s.id AS saleId, s.date, p.id AS productId, sp.quantity
    FROM ${databaseName}.sales_products AS sp
    INNER JOIN ${databaseName}.products AS p
    INNER JOIN ${databaseName}.sales AS s
    ON sp.sale_id = s.id AND sp.product_id = p.id
    ORDER BY s.id ASC, p.id ASC;
  `,
  getProductsFromASale: () => `
    SELECT s.date, p.id AS productId, sp.quantity
    FROM ${databaseName}.sales_products AS sp
    INNER JOIN ${databaseName}.products AS p
    INNER JOIN ${databaseName}.sales AS s
    ON sp.sale_id = s.id AND sp.product_id = p.id
    WHERE s.id = ?;
  `,
  updateProductFromASale: () => `
    UPDATE ${databaseName}.sales_products
    SET quantity=?
    WHERE sale_id=? AND product_id=?;
  `,
  countUniqueProductsSoldFromASale: () => `
    SELECT count(*) AS \`uniqueProductsSold\` FROM ${databaseName}.sales_products
    WHERE sale_id=?;
  `,
};

module.exports = sqlQueries;
