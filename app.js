// app.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const createError = require("http-errors");
require("dotenv").config();

// Import route handlers
const homeRoutes = require("./routes/home");
const userLoginRoutes = require("./routes/userlogin");
const adminLoginRoutes = require("./routes/adminlogin");
const resortsRoutes = require("./routes/resorts");

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Use routes
app.use("/", homeRoutes);
app.use("/userlogin", userLoginRoutes);
app.use("/adminlogin", adminLoginRoutes);
app.use("/resorts", resortsRoutes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
