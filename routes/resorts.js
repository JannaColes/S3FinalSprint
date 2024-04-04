// routes/resorts.js
const express = require("express");
const router = express.Router();
const resortsDAL = require("../services/pg.resorts.dal");

router.get('/', async (req, res) => {
  try {
    const allResorts = await resortsDAL.getAllResorts(); // Make sure this function is defined and exported in pg.resorts.dal.js
    res.json(allResorts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// More route handlers (POST, PUT, DELETE) go here using resortsDAL functions

module.exports = router;
