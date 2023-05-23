const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'my_shop'
});

module.exports = pool;