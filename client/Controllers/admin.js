// Controller/admin.js
module.exports.controller = function(router, passport) {
  
var express = require('express');
var path = require('path');
var passport = require('passport');

  router.get('/admin/login', function(req, res) {
      res.render('login.jade', { message: req.flash('loginMessage') });
  });
  
  router.get('/admin', isLoggedIn(), function(req, res) {
      res.render('admin.jade');
  });
  
  router.post('/admin/login', 
    passport.authenticate('local-login', { successRedirect: '/admin',
                                           failureRedirect: '/admin/login',
                                           failureFlash: true })
                          );
                          
  router.get('/admin/logout', function(req, res) {
        req.logout();
        res.redirect('/admin/login');
    });

};

function isLoggedIn() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/admin/login')
  }
}
