const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "password123",
  port: 5432,
  database: "perntodo",
});

module.exports = pool;
