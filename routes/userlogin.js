const express = require("express");
const passport = require("passport");
const router = express.Router();
const authService = require("../services/authService"); // You would create this

// User login page
router.get("/login/user", (req, res) => {
  res.render("userLogin");
});

// User login route
router.post(
  "/login/user",
  passport.authenticate("local", {
    successRedirect: "/user/dashboard", // or where you want the user to go after login
    failureRedirect: "/login/user",
    failureFlash: true,
  })
);

// Admin login route
router.post(
  "/login/admin",
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard", // or where you want the admin to go after login
    failureRedirect: "/login/admin",
    failureFlash: true,
  })
);

module.exports = router;
