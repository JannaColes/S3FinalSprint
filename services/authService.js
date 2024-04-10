//authService.js

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("./userModel");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, // Add this line to pass the req object to the callback
    },
    async (req, email, password, done) => {
      // Make sure to add `req` as the first parameter if you're using it
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("Serializing user:", user);
  done(null, user.user_id); // Change this line to use user.user_id instead of user.id
});

passport.deserializeUser(async function (user_id, done) {

  try {
    console.log("Deserializing user with ID:", user_id);
  const user = await User.findById(user_id);  
    done(null, user);
  } catch (error) {
    console.log(error); 
    
  }
  
});

module.exports = passport;
