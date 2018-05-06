module.exports.controller = function(router) { 

var passport = require('passport') 
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../Models/User');

passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (id, fn) {
  User.findOne({_id: id.doc._id}, function (err, user) {
    fn(err, user);
  });
});

passport.use(new TwitterStrategy({
    consumerKey: "U2sitMTjwMK07Cfcw1E9dZcRl",
    consumerSecret: "XKBiNbFQoQK4QiWYcpoiOFv80J2ktQt70UFz7PVlSRCEoOuU7y",
    callbackURL: "http://what-we-eat-buntun.c9users.io/auth/twitter/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id}, function(err, user) {
      if (err) {
        console.log(err);
        return done(err);
      }
      done(null, user);
    });
  }
));

};

