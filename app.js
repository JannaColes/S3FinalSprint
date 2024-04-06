const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method')); 


// // Set up session
// app.use(
//     session({
//       secret: process.env.SESSION_SECRET, // Use a .env variable for the secret
//       resave: true,
//       saveUninitialized: true,
//     })
//   );

// Route to render the index.ejs template
app.get('/', (req, res) => {
    res.render('index');
   
});


const adminRouter = require('./routes/admin')
app.use('/admin', adminRouter);


const resortsRouter = require('./routes/resorts')
app.use('/resorts', resortsRouter);


const apiRouter = require('./routes/api')
app.use('/api', apiRouter);


app.use((req, res) => {
    res.status(404).render('404');
  });





app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`);

});