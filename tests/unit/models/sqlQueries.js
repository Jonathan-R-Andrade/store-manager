const sqlQueries = {
  // products queries
  listProducts: 'SELECT * FROM StoreManager.products',
  getProduct: 'SELECT * FROM StoreManager.products WHERE id=?',
  addProduct: 'INSERT INTO StoreManager.products (name) VALUES (?)',
  updateProduct: 'UPDATE StoreManager.products SET name=? WHERE id=?',
  deleteProduct: 'DELETE FROM StoreManager.products WHERE id=?',
  getProductsBySearchTerm: `
    SELECT * FROM StoreManager.products
    WHERE name LIKE ?;
  `,
  countFoundProducts: `
    SELECT count('products') AS foundProducts FROM StoreManager.products
    WHERE id in (?,?);
  `,

  // sales queries
  addSale: 'INSERT INTO StoreManager.sales VALUES ()',
  deleteSale: 'DELETE FROM StoreManager.sales WHERE id=?',

  // sales_products queries
  addSaleProducts: `
    INSERT INTO StoreManager.sales_products
    VALUES (?,?,?)
  `,
  listSalesWithProducts: `
    SELECT s.id AS saleId, s.date, p.id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.products AS p
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id AND sp.product_id = p.id
    ORDER BY s.id ASC, p.id ASC;
  `,
  getProductsFromASale: `
    SELECT s.date, p.id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.products AS p
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id AND sp.product_id = p.id
    WHERE s.id = ?;
  `,
};

module.exports = sqlQueries;
