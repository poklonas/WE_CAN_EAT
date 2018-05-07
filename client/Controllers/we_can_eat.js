module.exports.controller = function(router) {
  
var express = require("express");
var path = require('path');
var mysql = require(path.resolve(__dirname, '../Models/we_can_eat.js'));

// a home page route
  router.get('/', function(req, res) {
    var data = {};
    mysql.getAllBusiness(function(val1){
      mysql.getAllTypes(function(val2) {
        data.BUSIList = val1;
        data.TypeList = val2;
        res.render('index', data);
      });
    });
  }); 

  router.get('/about_us', function(req, res) {
      res.render('about_us.jade');
  });
  
  // home page with filter by type
  router.get('/:tyID', function(req, res) {
      res.render('index');
  });

  // detail page 
  router.get('/detail/:bsID', function(req, res) {
      var id = req.params.bsID;
      mysql.getSpecificBusiness(function(val1){
        mysql.getAllFoodIn(function(val2){
          var data = {};
          data.BUSI = val1;
          data.menu = val2;       
          res.render('detail.jade', data);
        }, id);
      }, id);
  });
  
  // show all food 
  router.get('/all/food', function(req, res) {
     mysql.getAllFood(function(val1){
       var data = {};
       data.food = val1;
       res.render('show_food.jade', data);
     });
  });
  
  // show all Business 
  router.get('/all/business', function(req, res) {
     mysql.getAllBusiness(function(val1){
       var data = {};
       data.BUSIList = val1;
       console.log(data);
       res.render('show_busi.jade', data);
     });
  });
  
  // show all Type 
  router.get('/all/Type', function(req, res) {
     mysql.getAllTypes(function(val1){
       var data = {};
       data.type = val1;
       res.render('show_type.jade', data);
     });
  });

  // create new type 
  router.post('/add/type', function(req,res){
    mysql.insertType(function(status){
       console.log(status);
       res.redirect('/');
     }, req.body.name);
  });
  
  // create new business Type relation ********* manul 
  router.post('/add/busi_type', function(req,res){
    mysql.insertBusiType(function(status){
       console.log(status);
       res.redirect('/');
     }, req.body.bsID, req.body.typeID);
  });

};


