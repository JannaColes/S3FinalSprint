const express = require('express');

const router = express.Router();

const { myEmitter } = require('../logEvents');


const resortsDal = require('../services/m.resorts.dal'); 
const resortsDalPG = require('../services/pg.resorts.dal'); 


// http://localhost:3000/admin
router.get('/', async (req, res) => {
    try {
       let theResortsMongo = await resortsDal.getResorts(); 
       let theResortsPostgres = await resortsDalPG.getResorts(); 
        // if(DEBUG) console.table(theResortsMongo); // MongoDB Results 
        // if(DEBUG) console.table(theResortsPostgres); // Postgres Results 
        res.render('admin_dashboard', {theResortsMongo, theResortsPostgres});
    } catch (error) {
        
        let errorMsg = `Error 503: ${req.originalUrl} server GET request failed: ${error}`; 
        if (DEBUG) console.log(errorMsg); 
        myEmitter.emit('error503', errorMsg); 

        res.render('503');
    }
  });


  // http://localhost:3000/admin/id/delete
    // CRUD Operation: DELETE (takes user to delete_resort.ejs)
    router.get('/:_id/delete', async (req, res) => {
        if(DEBUG) console.log('resort.Delete : ' + req.params._id);
        res.render('delete_resort', {id: req.params._id});
      });



    // http://localhost:3000/admin/id/put
    // CRUD Operation: PUT (takes user to edit_resort.ejs)
    router.get('/:_id/put', async (req, res) => {
        if(DEBUG) console.log('resort.Put : ' + req.params._id);
        if(DEBUG) console.log(req.query.resort_name); 
        res.render('edit_resort', 
        {id: req.params._id,
        resort_name: req.query.resort_name, 
        city: req.query.city, 
        country: req.query.country,
        resort_type: req.query.resort_type,
        summary: req.query.summary,
        cost: req.query.cost,
        current_rate_usd: req.query.current_rate_usd,
        amenities: req.query.amenities,
        is_featured: req.query.is_featured});
      });




  // CRUD Operation: POST (user adds a resort to MongoDB database)
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
        res.render("admin_resortAdded", { resortName: req.body.name }); 
    } catch (err){
        if (err.status === 400) {
            res.status(400).render('404');
        } else {

            let errorMsg = `Error 503: ${req.originalUrl} server POST request failed: ${err}`; 
            if (DEBUG) console.log(errorMsg); 
            myEmitter.emit('error503', errorMsg); 

            res.render('503'); 
        } 
    }
    
  });



 //http://localhost:3000/admin/PUT?_id=
// CRUD Operation: PUT (user edits a resort from MongoDB database)
  router.put('/:_id', async (req, res) => {
    if(DEBUG) console.log('resorts.PUT: ' + req.params._id);
    if(DEBUG) {
        console.log(req.params._id, req.body.resort_name, req.body.city, req.body.country, req.body.resort_type, req.body.summary, req.body.cost, req.body.current_rate_usd, req.body.amenities, req.body.is_featured)
    }; 

    let idString = req.params._id; 
    if(DEBUG) console.log(idString.length); 

    if(idString.length === 24) {

        try {
            await resortsDal.putResort(
                req.params._id, 
                req.body.resort_name, 
                req.body.city, 
                req.body.country, 
                req.body.resort_type, 
                req.body.summary, 
                req.body.cost, 
                req.body.current_rate_usd, 
                req.body.amenities, 
                req.body.is_featured);
            res.render('admin_resortEdited', { id: req.params._id });
        } catch (err) {
            if (err.status === 400) {
                res.status(400).render('404', { message: err.message });
              } else {
                
                let errorMsg = `Error 503: ${req.originalUrl} server PUT request failed: ${err}`; 
                if (DEBUG) console.log(errorMsg); 
                myEmitter.emit('error503', errorMsg); 
    
                res.render('503'); 
    
        }
    }

    } else {

        try {
            await resortsDalPG.putResort(
                req.params._id, 
                req.body.resort_name, 
                req.body.city, 
                req.body.country, 
                req.body.resort_type, 
                req.body.summary, 
                req.body.cost, 
                req.body.current_rate_usd, 
                req.body.amenities, 
                req.body.is_featured);
            res.render('admin_resortEdited', { id: req.params._id });
        } catch (err) {
            if (err.status === 400) {
                res.status(400).render('404', { message: err.message });
              } else {
                
                let errorMsg = `Error 503: ${req.originalUrl} server PUT request failed: ${err}`; 
                if (DEBUG) console.log(errorMsg); 
                myEmitter.emit('error503', errorMsg); 
    
                res.render('503'); 
    
        }
    }

    }

  });



  //http://localhost:3000/admin/DELETE?_id=
// CRUD Operation: DELETE (user deletes a resort from MongoDB database)
  router.delete('/:_id', async (req, res) => {
    if(DEBUG) console.log('resorts.DELETE: ' + req.params._id);
    try {
        await resortsDal.deleteResort(req.params._id);
        res.render('admin_resortDeleted', { id: req.params._id });
    } catch (error) {

        let errorMsg = `Error 503: ${req.originalUrl} server DELETE request failed: ${error}`; 
        if (DEBUG) console.log(errorMsg); 
        myEmitter.emit('error503', errorMsg); 

        res.render('503');
    }
  });

  // http://localhost:3000/admin/searchMongo
  router.get('/searchMongo', async (req, res) => {

        const id  = req.query.id;
        if(DEBUG) console.log(id); 

        let resortM;

        try {
            resortM = await resortsDal.getResortsById(id); 

        if(DEBUG) console.log(resortM); 
        res.render('admin_idSearch_dashboard', { resort: resortM });

        } catch (error) {
            
            let errorMsg = `Error 503: ${req.originalUrl} server GET request failed: ${error}`; 
            if (DEBUG) console.log(errorMsg); 
            myEmitter.emit('error503', errorMsg); 
    
            res.render('503');
        }

});

 // http://localhost:3000/admin/searchPostgres
 router.get('/searchPostgres', async (req, res) => {


    const id  = req.query.id;
    if(DEBUG) console.log(id); 

    let resortPostgres;

    try {
        resortPostgres = await resortsDalPG.getResortsById(id); 

    if(DEBUG) console.log(resortPostgres); 
    res.render('admin_idSearch_dashboard', { resort: resortPostgres });

    } catch (error) {
        let errorMsg = `Error 503: ${req.originalUrl} server GET request failed: ${error}`; 
        if (DEBUG) console.log(errorMsg); 
        myEmitter.emit('error503', errorMsg); 

        res.render('503');
    }

});



  // http://localhost:3000/admin/search
  router.get('/search', async (req, res) => {

    const keyword = req.query.keyword; 
    if(DEBUG) console.log(keyword); 
    try {
   resorts = await resortsDal.getResortsByKeyword(keyword); 
   resortsPostgres = await resortsDalPG.getResortsByKeyword(keyword); 

   if(DEBUG) console.log(resorts, resortsPostgres); 
    res.render('admin_search_dashboard', { theResorts: resorts, theResortsPG: resortsPostgres  });


    } catch  (error) {
        let errorMsg = `Error 503: ${req.originalUrl} server GET request failed: ${error}`; 
        if (DEBUG) console.log(errorMsg); 
        myEmitter.emit('error503', errorMsg); 

        res.render('503');
    }


});

  module.exports = router; 