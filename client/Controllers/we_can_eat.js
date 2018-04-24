module.exports.controller = function(router) {

var express = require('express');
var path = require('path');
var mysql = require(path.resolve(__dirname, '../Models/we_can_eat.js'));
var delay = require('delay');

// a home page route
  router.get('/', function(req, res) {
    var render = function(val){ 
      console.log("in controller " + val);
      res.render('index', {"TypeList": val});
    }
    mysql.getAllTypes(render);
  });

  router.get('/home', function(req, res) {
      res.render('index');
  });

  // home page with filter by type
  router.get('/:tyID', function(req, res) {
      // request to models and trans to array and render 
      res.render('index')
  });

// detail page 
  router.get('/detail/:bsID', function(req, res) {
      // request to models and trans to array and render 
      res.render('detail.jade')
  });
  

}

