const express = require("express");
const router = express.Router();
const resortsDAL = require("../services/pg.resorts.dal");

// Route to get all resorts
router.get("/", async (req, res) => {
  try {
    console.log("Fetching all resorts...");
    const allResorts = await resortsDAL.getAllResorts();
    res.render("resorts-list", { resorts: allResorts });
  } catch (error) {
    console.error("Error fetching all resorts:", error);
    res.status(500).json({ message: error.message });
  }
});

// Search page route
router.get("/search", (req, res) => {
  console.log("Rendering search page...");
  // You should display the login success message if it's available
  const successMsg = req.flash("success");
  // Pass the message as part of an object with key 'messages'
  res.render("search", {
    messages: { success: successMsg }, // This will create an object with a 'success' key
    resorts: [],
  });
});

// Route to handle the search request
router.get("/search-results", async (req, res) => {
  const { keyword } = req.query;
  try {
    console.log(`Searching resorts with keyword: ${keyword}`);
    const resorts = await resortsDAL.searchResorts(keyword);
    res.render("search", { resorts });
  } catch (error) {
    console.error("Error searching resorts:", error);
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new resort
router.post("/", async (req, res) => {
  try {
    const newResort = await resortsDAL.createResort(req.body);
    res.status(201).json(newResort);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update an existing resort
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedResort = await resortsDAL.updateResort(id, req.body);
    if (updatedResort) {
      res.json(updatedResort);
    } else {
      res.status(404).json({ message: "Resort not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a resort
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await resortsDAL.deleteResort(id);
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

