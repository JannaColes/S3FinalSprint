// require("dotenv").config();
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