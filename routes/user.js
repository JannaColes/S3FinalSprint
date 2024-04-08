const express = require('express');

const router = express.Router();

const { myEmitter } = require('../logEvents');


const resortsDal = require('../services/m.resorts.dal'); 
const resortsDalPG = require('../services/pg.resorts.dal'); 


// http://localhost:3000/user
router.get('/', async (req, res) => {
    try {
       let theResortsMongo = await resortsDal.getResorts(); 
       let theResortsPostgres = await resortsDalPG.getResorts(); 
        // if(DEBUG) console.table(theResortsMongo); // MongoDB Results 
        // if(DEBUG) console.table(theResortsPostgres); // Postgres Results 
        res.render('user_dashboard', {theResortsMongo, theResortsPostgres});
    } catch (error) {
        
        let errorMsg = `Error 503: ${req.originalUrl} server GET request failed: ${error}`; 
        if (DEBUG) console.log(errorMsg); 
        myEmitter.emit('error503', errorMsg); 

        res.render('503');
    }
  });




  // http://localhost:3000/user/search
  router.get('/search', async (req, res) => {

    const keyword = req.query.keyword; 
    if(DEBUG) console.log(keyword); 
    try {
   resorts = await resortsDal.getResortsByKeyword(keyword); 
   resortsPostgres = await resortsDalPG.getResortsByKeyword(keyword); 

   if(DEBUG) console.log(resorts, resortsPostgres); 
    res.render('user_search_dashboard', { theResorts: resorts, theResortsPG: resortsPostgres  });


    } catch  (error) {
        let errorMsg = `Error 503: ${req.originalUrl} server GET request failed: ${error}`; 
        if (DEBUG) console.log(errorMsg); 
        myEmitter.emit('error503', errorMsg); 

        res.render('503');
    }


});



  module.exports = router; 
