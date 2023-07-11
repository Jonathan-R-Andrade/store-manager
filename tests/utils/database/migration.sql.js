// SQL commands to create the database and tables needed
// for the API to work if they don't exist yet.
module.exports = (databaseName) => `
  CREATE DATABASE IF NOT EXISTS ${databaseName};

  USE ${databaseName};

  CREATE TABLE IF NOT EXISTS products (
    id INT NOT NULL auto_increment,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
  ) ENGINE=INNODB;

  CREATE TABLE IF NOT EXISTS sales (
    id INT NOT NULL auto_increment,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
  ) ENGINE=INNODB;

  CREATE TABLE IF NOT EXISTS sales_products (
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (sale_id)
      REFERENCES sales (id)
      ON DELETE CASCADE,
    FOREIGN KEY (product_id)
      REFERENCES products (id)
      ON DELETE CASCADE
  )  ENGINE=INNODB;

  SET SQL_SAFE_UPDATES = 0;
`;
