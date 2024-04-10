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

        const isAdmin = user.is_admin || false; 
        console.log(isAdmin); 

        return done(null, {...user, isAdmin});
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("Serializing user:", user);
  done(null, { userId: user.user_id, isAdmin: user.isAdmin }); // Change this line to use user.user_id instead of user.id
});

passport.deserializeUser(async function ({ userId, isAdmin }, done) {
  try {
    console.log("Deserializing user with ID:", userId);
    const user = await User.findById(userId);
    if (user) {
      user.isAdmin = isAdmin; // Attach isAdmin flag to user object
      done(null, user);
    } else {
      done(new Error('User not found during deserialization'));
    }
  } catch (error) {
    done(error);
  }
});


module.exports = passport;
