var router = require('express').Router();
const resortsDalPG = require('../../services/pg.resorts.dal')
const resortsDal = require('../../services/m.resorts.dal')

   
// http://localhost:3000/api/resorts
router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/resorts/ GET ' + req.url);
    res.send('Search API by database: http://localhost:3000/api/resorts/postgres or http://localhost:3000/api/resorts/mongo');
});

// http://localhost:3000/api/resorts/postgres 
router.get('/postgres', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/resorts/postgres GET ' + req.url);
    try {
        let theResortsPG = await resortsDalPG.getResorts(); 
       res.json(theResortsPG); 

    } catch (error){
        console.log(error); 
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

// http://localhost:3000/api/resorts/mongo
router.get('/mongo', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/resorts/mongo GET ' + req.url);
    try {
        let theResorts = await resortsDal.getResorts(); 
        res.json(theResorts);

    } catch (error){
        console.log(error); 
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

module.exports = router;