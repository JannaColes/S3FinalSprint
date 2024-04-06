const express = require('express');

const router = express.Router();


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
    } catch (err) {
        if(DEBUG) console.log(err);
        // log this error to an error log file.
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
        res.render('edit_resort', {id: req.params._id});
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
            // Handle other errors
            res.status(500).render('503', { message: 'An unexpected error occurred.' });

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
    } catch {
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
            console.error('Error searching for resorts:', error);
            res.status(500).send('Internal Server Error');
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
        console.error('Error searching for resorts:', error);
        res.status(500).send('Internal Server Error');
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
        console.error('Error searching for resorts:', error);
        res.status(500).send('Internal Server Error');
    }









        // const { id, keyword } = req.query;
        // const keyword = req.query; 
        // if(DEBUG) console.log(keyword); 
        // if(DEBUG) console.log(id, keyword); 

    //     let resorts;
    //     let resortsPostgres; 

    //     if (id) {
    //         resorts = await resortsDal.getResortsById(id); 
    //         resortsPostgres = await resortsDalPG.getResortsById(id); 
    //     } else if (keyword) {
      
    //         resorts = await resortsDal.getResortsByKeyword(keyword); 
    //         resortsPostgres = await resortsDalPG.getResortsByKeyword(keyword); 
    //     } else {

    //         resorts = [];
    //     }

    //     if(DEBUG) console.log(resorts, resortsPostgres); 
    //     res.render('admin_search_dashboard', { theResorts: resorts, theResortsPG: resortsPostgres  });
    // } catch (error) {
    //     console.error('Error searching for resorts:', error);
    //     res.status(500).send('Internal Server Error');
    // }
});

  module.exports = router; 