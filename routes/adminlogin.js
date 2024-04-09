const express = require("express");
const passport = require("passport");
const router = express.Router();
const authService = require("../services/authService"); // You would create this

// Admin login page
router.get("/login/admin", (req, res) => {
  res.render("adminLogin");
});

// Assuming you have a different strategy or logic for admin authentication
router.post(
  "/login",
  passport.authenticate("local-admin", {
    successRedirect: "/admin",
    failureRedirect: "/adminlogin",
    failureFlash: true, // Optionally use connect-flash for flash messages
  })
);

// Export the router
module.exports = router;
