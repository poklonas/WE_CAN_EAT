// Controller/admin.js
module.exports.controller = function(router, passport) {
  
var express = require('express');
var path = require('path');
var fs = require('fs');
var mysql = require(path.resolve(__dirname, '../Models/we_can_eat.js'));
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
    
  router.get('/manage/food', isLoggedIn(), function(req, res) {
     mysql.getAllFood(function(val1){
       var data = {};
       data.food = val1;
       res.render('manage_food.jade', data);
     });
  });

  router.get('/manage/business', isLoggedIn(),function(req, res) {
     mysql.getAllBusiness(function(val1){
       var data = {};
       data.BUSIList = val1;
       console.log(data);
       res.render('manage_business.jade', data);
     });
  });
  
  router.get('/delete/food/:id', isLoggedIn(), function(req,res){
    var id = req.params.id;
    mysql.deleteFood(function(status){
       console.log(status);
       res.redirect('/manage/food');
     }, id);
  });

  router.post('/add/food', isLoggedIn(), function(req,res){
    mysql.insertFood(function(status){
       console.log(status);
       res.redirect('/manage/food');
     }, req.body.name);
  });

  router.get('/add/busi', isLoggedIn(), function(req,res){
    var data = {};
    mysql.getAllTypes(function(val1) {
      data.TypeList = val1;
      res.render('add_busi.jade',data);
    });
  });

  router.post('/add/busi', isLoggedIn(), function(req,res){
    //mysql.insertBusiness(function(status1){
    //  mysql.getLastId(function(val){
    //    mysql.insertBusiType(function(status2){
    //      console.log(req.body);
    //      console.log(val[0].lastID);
    //      console.log(status1);
    //      console.log(status2);
    //      res.redirect('/');
    //    }, val[0].lastID, req.body.type)
    //  });
    //}, req.body);
    var tempPath = req.files.file.path
    var targetPath = path.resolve(__dirname, '../Static/pic/'+req.files.file.name);
    if (path.extname(req.files.file.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) console.log(err);
            res.render('admin.jade');
        });
    } else {
        fs.unlink(tempPath, function (err) {
            if (err) console.log(err);
            res.render('admin.jade');
        });
    }
    
  });
  
  router.get('/add/menu', isLoggedIn(), function(req,res){
     mysql.getAllFood(function(val1){
       var data = {};
       data.food = val1;
       res.render('add_menu.jade', data);
     });
  });
  
  router.get('/edit/busi/:bsID', isLoggedIn(), function(req,res){
      var id = req.params.bsID;
      mysql.getSpecificBusiness(function(val1){
        mysql.getAllFoodIn(function(val2){
          var data = {};
          data.BUSI = val1;
          data.menu = val2;       
          res.render('edit_business.jade', data);
        }, id);
      }, id);
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
