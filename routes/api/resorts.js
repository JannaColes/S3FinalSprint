var router = require('express').Router();
// const loginsDal = require('../../services/pg.logins.dal')
const loginsDal = require('../../services/m.resorts.dal')

if(DEBUG) console.log('ROUTE: /api/resorts');
   
// api/logins
router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/resorts/ GET ' + req.url);
    try {
        let theResorts = await resortsDal.getResorts(); 
        res.json(theResorts);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});