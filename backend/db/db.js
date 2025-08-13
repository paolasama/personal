const { Pool } = require('pg');

const pool = new Pool({
  user: 'paolasama',
  host: 'localhost',
  database: 'portafolio',
  password: '1234',
  port: 5432,
});

module.exports = pool;