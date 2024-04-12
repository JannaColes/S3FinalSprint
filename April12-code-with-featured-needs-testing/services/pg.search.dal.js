// pg.search.dal.js
const pool = require("./pg_auth_db");

const searchResorts = async (keyword) => {
  const res = await pool.query(
    "SELECT * FROM resorts WHERE name ILIKE $1 OR summary ILIKE $1",
    [`%${keyword}%`]
  );
  return res.rows;
};

module.exports = {
  searchResorts,
};
