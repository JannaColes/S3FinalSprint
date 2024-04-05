const express = require('express');

const router = express.Router();


const resortsDal = require('../services/m.resorts.dal'); 


// http://localhost:3000/admin
router.get('/', async (req, res) => {
    try {
       let theResorts = await resortsDal.getResorts(); 
        if(DEBUG) console.table(theResorts);
        res.render('admin_dashboard', {theResorts});
    } catch (err) {
        if(DEBUG) console.log(err);
        // log this error to an error log file.
        res.render('503');
    }
  });



  router.post('/', async (req, res) => {

    if(DEBUG) console.log("admin.POST");
    try {
        if(DEBUG) console.log(req.body.amenities); 
        await resortsDal.addResort(
            req.body.name,
            req.body.city,
            req.body.country,
            req.body.type,
            req.body.summary,
            req.body.cost, 
            req.body.rate,
            req.body.amenities,
            req.body.isFeatured
        );
        res.redirect('/admin'); 
    } catch (err){
        if (err.status === 400) {
            res.status(400).render('usernameError');
        } else {
            res.render('503'); 
        } 
    }
    
  });



  // http://localhost:3000/admin/search
  router.get('/search', async (req, res) => {
    try {

        const { id, keyword } = req.query;
        if(DEBUG) console.log(id, keyword); 

        let resorts;

        if (id) {
            resorts = await resortsDal.getResortsById(id); 
        } else if (keyword) {
      
            resorts = await resortsDal.getResortsByKeyword(keyword); 
        } else {

            resorts = [];
        }

        if(DEBUG) console.log(resorts); 
        res.render('admin_search_dashboard', { theResorts: resorts });
    } catch (error) {
        console.error('Error searching for resorts:', error);
        res.status(500).send('Internal Server Error');
    }
});

  module.exports = router; 