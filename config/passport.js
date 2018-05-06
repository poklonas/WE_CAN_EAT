// config/passport.js
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var md5 = require('md5');
var mysql = require('mysql');

var con = mysql.createConnection({
     host: "localhost",
     user: "buntun",
     database : "WeCanEat",
});

module.exports = function(passport) {
  
    passport.serializeUser(function(user, done) {
        done(null, user.ID);
    });

    passport.deserializeUser(function(ID, done) {
        var query = "SELECT * FROM User WHERE ID = '"+ ID + "';";
          con.query(query , function (err, user) { 
            if ( err ) return console.log(err);
            done(null, user);
          });
    });

   passport.use('local-login', new LocalStrategy({
          usernameField : 'email',
          passwordField : 'password',
          passReqToCallback : true 
      },
      
    function(req, email, password, done) {
        process.nextTick(function() {
          
          var query = "SELECT * FROM User WHERE email = '"+ email + "';";
          con.query(query , function (err, user) { 
            if (err) return console.log(err); 
            if(user[0] == null){
              return done(null, false, req.flash('loginMessage', 'That email address does not exist'));
            }
            
            if(user[0].Pswd == md5(password)){
               return done(null, user[0]);
            }else{
              return done(null, false, req.flash('loginMessage', 'Wrong password'));
            }
          });
        });
    }));
};