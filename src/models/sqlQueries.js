// Returns a string of question marks separated by commas,
// ex: makeQuestionMarks(3) returns '?,?,?'
const makeQuestionMarks = (total) => new Array(total).fill('?').join(',');
// Returns a string of question marks separated by commas within parentheses
// separated by commas, ex: makeRows(3, 2) returns '(?,?),(?,?),(?,?)'
const makeRows = (totalRows, totalColumns) =>
  new Array(totalRows).fill(`(${makeQuestionMarks(totalColumns)})`).join(',');

const dbName = process.env.MYSQL_DATABASE;

const sqlQueries = {
  // products queries
  listProducts: () => `SELECT * FROM ${dbName}.products`,
  getProduct: () => `SELECT * FROM ${dbName}.products WHERE id=?`,
  addProduct: () => `INSERT INTO ${dbName}.products (name) VALUES (?)`,
  updateProduct: () => `UPDATE ${dbName}.products SET name=? WHERE id=?`,
  deleteProduct: () => `DELETE FROM ${dbName}.products WHERE id=?`,
  countFoundProducts: (totalIds) => `
    SELECT count('products') AS foundProducts FROM ${dbName}.products
    WHERE id in (${makeQuestionMarks(totalIds)});
  `,
  getProductsBySearchTerm: () => `
    SELECT * FROM ${dbName}.products
    WHERE name LIKE ?;
  `,

  // sales queries
  addSale: () => `INSERT INTO ${dbName}.sales VALUES ()`,
  deleteSale: () => `DELETE FROM ${dbName}.sales WHERE id=?`,

  // product_id queries
  addSaleProducts: (totalRows, totalColumns) => `
    INSERT INTO ${dbName}.sales_products
    VALUES ${makeRows(totalRows, totalColumns)}
  `,
  listSalesWithProducts: () => `
    SELECT s.id AS saleId, s.date, p.id AS productId, sp.quantity
    FROM ${dbName}.sales_products AS sp
    INNER JOIN ${dbName}.products AS p
    INNER JOIN ${dbName}.sales AS s
    ON sp.sale_id = s.id AND sp.product_id = p.id
    ORDER BY s.id ASC, p.id ASC;
  `,
  getProductsFromASale: () => `
    SELECT s.date, p.id AS productId, sp.quantity
    FROM ${dbName}.sales_products AS sp
    INNER JOIN ${dbName}.products AS p
    INNER JOIN ${dbName}.sales AS s
    ON sp.sale_id = s.id AND sp.product_id = p.id
    WHERE s.id = ?;
  `,
  updateProductFromASale: () => `
    UPDATE ${dbName}.sales_products
    SET quantity=?
    WHERE sale_id=? AND product_id=?;
  `,
  checkIfExistsSaleOfProducts: () => `
    SELECT count('exists') AS \`exists\` FROM ${dbName}.sales_products
    WHERE sale_id=?;
  `,
};

module.exports = sqlQueries;
