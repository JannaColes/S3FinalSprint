const express = require("express");
const router = express.Router();

// You could require your DAL if you need to fetch dynamic content for the homepage
// const resortsDAL = require('../services/pg.resorts.dal');

router.get("/", async (req, res) => {
  try {
    // If you need to fetch data from your DAL to display on the homepage
    // const featuredResorts = await resortsDAL.getFeaturedResorts();

    // Render the 'home.ejs' view file with the featured resorts data
    res.render("home", {
      title: "Travel Guru - Your Adventure Awaits",
      // Pass any dynamic data needed for your homepage EJS template
      // featuredResorts: featuredResorts
    });
  } catch (err) {
    // Log the error and render an error page or send a response
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
