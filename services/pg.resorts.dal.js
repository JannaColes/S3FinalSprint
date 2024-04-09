// pg.resorts.dal.js
const pool = require("./pg_auth_db");

const getAllResorts = async () => {
  try {
    const results = await pool.query("SELECT * FROM resorts");
    return results.rows;
  } catch (err) {
    throw err;
  }
};

const searchResorts = async (keyword) => {
  const query = "SELECT * FROM resorts WHERE name ILIKE $1 OR summary ILIKE $1";
  const values = [`%${keyword}%`];
  const results = await pool.query(query, values);
  return results.rows;
};

const getResortById = async (resortId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM resorts WHERE resort_id = $1",
      [resortId]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const createResort = async (resortData) => {
  try {
    const {
      name,
      city,
      country,
      resort_type,
      summary,
      cost_category,
      current_rate,
      amenities,
    } = resortData;
    const result = await pool.query(
      "INSERT INTO resorts (name, city, country, resort_type, summary, cost_category, current_rate, amenities) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        name,
        city,
        country,
        resort_type,
        summary,
        cost_category,
        current_rate,
        amenities,
      ]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const updateResort = async (resortId, resortData) => {
  try {
    const {
      name,
      city,
      country,
      resort_type,
      summary,
      cost_category,
      current_rate,
      amenities,
    } = resortData;
    const result = await pool.query(
      "UPDATE resorts SET name = $1, city = $2, country = $3, resort_type = $4, summary = $5, cost_category = $6, current_rate = $7, amenities = $8 WHERE resort_id = $9 RETURNING *",
      [
        name,
        city,
        country,
        resort_type,
        summary,
        cost_category,
        current_rate,
        amenities,
        resortId,
      ]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const deleteResort = async (resortId) => {
  try {
    await pool.query("DELETE FROM resorts WHERE resort_id = $1", [resortId]);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllResorts,
  getResortById,
  createResort,
  updateResort,
  deleteResort,
  searchResorts,
};
