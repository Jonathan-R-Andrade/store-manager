require('../../../src/utils/dotEnvVariables').load();
const mysql = require('mysql2/promise');
const migrationSql = require('./migration.sql');
const seedSql = require('./seed.sql');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  multipleStatements: true,
});

const runSql = (sql, successMessage = 'Command executed successfully!') => async () => {
  try {
    await connection.query(sql);
    await connection.end();
    console.log(successMessage);
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

const runMigration = runSql(
  migrationSql(process.env.MYSQL_DATABASE),
  'Database and tables created successfully!',
);
const runSeed = runSql(
  seedSql(process.env.MYSQL_DATABASE),
  'Database populated successfully!',
);

module.exports = {
  runMigration,
  runSeed,
}
