// index.js

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const createError = require("http-errors");
const passport = require("./services/authService"); // Update the path to where your passport config is actually located
require("dotenv").config();

const app = express();

// Set up session
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use a .env variable for the secret
    resave: true,
    saveUninitialized: true,
  })
);

// Import route handlers
const homeRoutes = require("./routes/home");
const userLoginRoutes = require("./routes/userlogin");
const adminLoginRoutes = require("./routes/adminlogin");
const resortsRoutes = require("./routes/resorts");
const registerRoutes = require("./routes/register");

// Middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/register", registerRoutes); // Add this line to use the register routes

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Use routes
app.use("/", homeRoutes);
app.use("/userlogin", userLoginRoutes);
app.use("/adminlogin", adminLoginRoutes);
app.use("/resorts", resortsRoutes);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error", { error: err }); // Make sure to pass the error object with the key 'error'
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
