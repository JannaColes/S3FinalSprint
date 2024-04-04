// pg.resorts.dal.js
const pool = require('./pg_auth_db');

const getAllResorts = async () => {
  try {
    const results = await pool.query("SELECT * FROM resorts");
    return results.rows;
  } catch (err) {
    throw err;
  }
};

const getResortById = async (resortId) => {
  // Implementation to fetch a single resort by ID
};

const createResort = async (resortData) => {
  // Implementation to create a new resort
};

const updateResort = async (resortId, resortData) => {
  // Implementation to update a resort
};

const deleteResort = async (resortId) => {
  // Implementation to delete a resort
};

module.exports = {
  getAllResorts,
  getResortById,
  createResort,
  updateResort,
  deleteResort,
};
