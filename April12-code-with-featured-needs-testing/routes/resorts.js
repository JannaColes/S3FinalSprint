const express = require('express');

const router = express.Router();
const { myEmitter } = require('../logEvents');


const resortsDal = require('../services/m.resorts.dal'); 

// http://localhost:3000/resorts 
router.get('/', async (req, res) => {
    try {
       let theResorts = await resortsDal.getResorts(); 
        if(DEBUG) console.table(theResorts);
        res.render('resorts', {theResorts});
    } catch (error) {
        let errorMsg = `Error 503: ${req.originalUrl} server GET request failed: ${error}`; 
        if (DEBUG) console.log(errorMsg); 
        myEmitter.emit('error503', errorMsg); 

        res.render('503');
      
    }
  });





  module.exports = router; 
  