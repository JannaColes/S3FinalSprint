const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // This is important!
app.use(methodOverride('_method')); // So is this!

// Route to render the index.ejs template
app.get('/', (req, res) => {
    res.render('index');
   
});

const resortsRouter = require('./routes/resorts')
app.use('/resorts', resortsRouter);

app.use((req, res) => {
    res.status(404).render('404');
  });

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`);

});