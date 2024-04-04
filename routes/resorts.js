const express = require('express');

const router = express.Router();


const resortsDal = require('../services/m.resorts.dal'); 

router.get('/', async (req, res) => {
    try {
       let theResorts = await resortsDal.getResorts(); 
        if(DEBUG) console.table(theResorts);
        res.render('resorts', {theResorts});
    } catch (err) {
        if(DEBUG) console.log(err);
        // log this error to an error log file.
        res.render('503');
    }
  });

  module.exports = router; 
  