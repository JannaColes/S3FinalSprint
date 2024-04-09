const express = require("express");
const router = express.Router();
const User = require("../services/userModel"); // assuming userModel handles your database logic
 
// Display the user registration form
router.get("/", (req, res) => {
  res.render("create-user", { errors: null }); // pass null or an empty array if you don't have any errors to show initially
});
 
// Handle the user registration form submission
router.post("/", async (req, res, next) => {
  try {
    // Call a method to create a new user. You'll define this method in your userModel or another appropriate service module.
    const newUser = await User.create(req.body);
    res.redirect("/userlogin"); // Redirect to home or login page on successful registration
  } catch (error) {
    // If there's an error (e.g., email already exists), re-render the form with an error message
    res.render("create-user", { errors: [error.message] });
  }
});
 
module.exports = router;