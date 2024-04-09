var router = require('express').Router();

if(DEBUG) {
    console.log('ROUTE: /api');
}

router.get('/', (req, res) => {
    // res.render('apihome');    Amy: I didn't find ejs file
    res.send('API Home Page Working');
});

// http://localhost:3000/api/resorts/
const resortsRouter = require('./resorts.js')
router.use('/resorts', resortsRouter);

// http://localhost:3000/api/full/
const fullTextRouter = require('./fulltext.js')
router.use('/full', fullTextRouter);

// // http://localhost:3000/api/users/
// const usersRouter = require('./users.js')
// router.use('/users', usersRouter);

module.exports = router;