const express = require("express");
const router = express.Router();
const passport = require("../services/authService");
const logUserLogin = require("../services/loginLogger");
const flash = require("connect-flash");

// Display the user login form
router.get("/", (req, res) => {
  try {
    console.log("Rendering login form.");
    res.render("user-login", { message: req.flash("error"), heading: "Hi, Hiya, Howdy, G'Day.", customer: true});
  } catch (error) {
    console.log(error); 
  }
});

// Handle the user login form submission
router.post("/", (req, res, next) => {
  console.log("Login form submitted.");
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return next(err);
    }
    if (!user) {
      console.log("Authentication failed, user not found:", info.message);
      req.flash("error", info.message);
      return res.redirect("/userlogin");
    }
    console.log("User found, attempting to log in:", user);
    req.logIn(user, async (err) => {
      if (err) {
        console.error("Login error:", err);
        return next(err);
      }
      console.log("User logged in, attempting to log the login.");
      // Log the login if user is successfully authenticated
      try {
        await logUserLogin(user.user_id);
        console.log(`Login for user_id ${user.user_id} logged.`);
        req.flash("success", "You are successfully logged in.");
        console.log("Redirecting to search page.");
        // Save the session before redirecting
        req.session.save(() => {
          if(user.is_admin) {
            res.redirect("/admin"); 
          } 
          else {res.redirect("/user");}
    
        });
      } catch (error) {
        console.error("Logging login failed:", error);
        next(error);
      }
    });
  })(req, res, next);
});

module.exports = router;
// Path: services/authService.js
