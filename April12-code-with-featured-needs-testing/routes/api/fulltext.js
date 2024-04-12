var router = require('express').Router();
const mDal = require('../../services/m.fulltext.dal')
const pgDal = require('../../services/pg.fulltext.dal')

// http://localhost:3000/api/full
router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/full' + req.params.keyword);
   res.send("Full Text API"); 
});


// http://localhost:3000/api/full/m/:keyword
router.get('/m/:keyword', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/full/m/ GET ' + req.params.keyword);
    try {
        let theKeyword = await mDal.getResortsByKeyword(req.params.keyword); 
        if(theKeyword.length === 0) {
          res.statusCode = 404;
          res.json({message: "Not Found", status: 404});
        } else
        res.json(theKeyword);
    } catch (error) {
        console.log(error);
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});



// http://localhost:3000/api/full/pg/:keyword
router.get('/pg/:keyword', async (req, res) => {
  if(DEBUG) console.log('ROUTE: /api/full/pg/ GET ' + req.params.keyword);
  try {
      let theKeyword = await pgDal.getResortsByKeyword(req.params.keyword); 
      if(theKeyword.length === 0) {
        res.statusCode = 404;
        res.json({message: "Not Found", status: 404});
      } else
        res.json(theKeyword);
  } catch (error){
     console.log(error); 
    res.statusCode = 503;
      res.json({message: "Service Unavailable", status: 503});
  }
});

module.exports = router;