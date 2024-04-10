// index.js is the entry point for the application. It sets up the server and routes.

const express = require("express");
const session = require("express-session");
const passport = require("./services/authService"); // Update the path to where your passport config is actually located
const path = require("path");
const createError = require("http-errors");
const methodOverride = require('method-override');
require("dotenv").config(); // Load environment variables from a .env file into process.env

const flash = require("connect-flash");
// const bodyParser = require("body-parser");

const { myEmitter } = require('./logEvents');

global.DEBUG = true;

const app = express();

// Set up session
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use a .env variable for the secret
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash()); // Initialize flash messages

// Body parsers for JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride('_method')); 

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Import route handlers
const homeRoutes = require("./routes/home");
const userLoginRoutes = require("./routes/userlogin");
const adminLoginRoutes = require("./routes/adminlogin");
const resortsRoutes = require("./routes/resorts");
const registerRoutes = require("./routes/register");

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const resortsRouter = require('./routes/resorts'); 
const apiRouter = require('./routes/api'); 

// app.use("/register", registerRoutes); // Add this line to use the register routes



// Use routes
app.use("/", noCheck, homeRoutes);
app.use("/adminlogin", adminLoginRoutes);
app.use("/userlogin", checkNotAuthenticated, userLoginRoutes);
// app.use("/resorts", resortsRoutes);
app.use("/register", checkNotAuthenticated, registerRoutes);

app.use('/admin', checkAuthenticated, adminRouter);
app.use('/user', checkAuthenticated, userRouter);
// app.use('/resorts', resortsRouter);
app.use('/api', noCheck, apiRouter);

// Catch 404 and forward to error handler
// app.use(function (req, res, next) {

//   let errorMsg = `Route: ${req.url} not found`; 
//             if (DEBUG) console.log(errorMsg); 
//     myEmitter.emit('error404', errorMsg); 

//   next(createError(404));
// });

// Error handler
// app.use(function (err, req, res, next) {
//   // Set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   if(DEBUG) console.log("503 error"); 
//   // Render the error page
//   res.status(err.status || 500);
//   res.render("503", { error: err }); // Make sure to pass the error object with the key 'error'
// });


function noCheck(req, res, next) {
  if(DEBUG) console.log("noCheck"); 
  return next(); 
}


function checkAuthenticated(req, res, next) {
  if ( req.isAuthenticated()) {
    if(DEBUG) console.log("checkAuth"); 
      return next();
  }
  res.redirect('/userlogin');
}
function checkNotAuthenticated(req, res, next) {
  if ( req.isAuthenticated()) {
    if(DEBUG) console.log("checkNOTAuth"); 
      return res.redirect('/user');
  }
  return next();
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

