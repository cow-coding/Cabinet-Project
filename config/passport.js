// config/passport.js

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user");

// serialize & deserialize User
passport.serializeUser(function (user, done) {
  done(null, user.studentID);
});

passport.deserializeUser(function (studentID, done) {
  User.findOne({ studentID: studentID }, function (err, user) {
    done(err, user);
  });
});

// local strategy
passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "name",
      passwordField: "studentID",
      passReqToCallback: true,
    },
    function (req, studentID, name, done) {}
  )
);
