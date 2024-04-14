require("dotenv").config();
const { Pool } = require("pg");

global.DEBUG = true;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});


if(DEBUG) console.log("Connected to Postgres...");

module.exports = pool;

