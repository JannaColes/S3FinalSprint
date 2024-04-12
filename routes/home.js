const express = require("express");
const router = express.Router();

const { myEmitter } = require('../logEvents'); 

// You could require your DAL if you need to fetch dynamic content for the homepage
const resortsDal = require('../services/m.resorts.dal'); 
const resortsDalPG = require('../services/pg.resorts.dal'); 

router.get("/", async (req, res) => {
  try {
    if(DEBUG) console.log("Home Route"); 
   
    let theResortsMongo = await resortsDal.getResorts(); 
    let theResortsPostgres = await resortsDalPG.getResorts(); 

    // Render the 'home.ejs' view file with the featured resorts data
    res.render("home", {
      title: "Travel Guru - Your Adventure Awaits",
      // Pass any dynamic data needed for your homepage EJS template
      // featuredResorts: featuredResorts
    });
  } catch (err) {
    let errorMsg = `Error 503: ${req.originalUrl} server GET request failed: ${err}`; 
        if (DEBUG) console.log(errorMsg); 
    myEmitter.emit('error503', errorMsg); 
  }
});

module.exports = router;

