// require("dotenv").config();
// const { Pool } = require("pg");

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// });

// module.exports = pool;

global.DEBUG = true;

const { Pool } = require("pg");

const pool = new Pool({
  user: 'postgres',
  host: "localhost",
  database: "FinalSprint-Travel",
  password: "KeyinSem3!",
  port: 5433,
});

if(DEBUG) console.log("Connected to Postgres...");

module.exports = pool;