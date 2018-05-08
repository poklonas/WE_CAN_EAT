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
       data.message = req.flash['FoodManage'];
       req.flash['FoodManage'] = "";
       res.render('manage_food.jade', data);
     });
  });

  router.get('/manage/business', isLoggedIn(),function(req, res) {
     mysql.getAllBusiness(function(val1){
       var data = {};
       data.BUSIList = val1;
       res.render('manage_business.jade', data);
     });
  });
  
  router.get('/delete/food/:id', isLoggedIn(), function(req,res){
    var id = req.params.id;
    mysql.deleteFood(function(status){
       req.flash['FoodManage'] = "Delete Food Success";
       res.redirect('/manage/food');
     }, id);
  });

  router.post('/add/food', isLoggedIn(), function(req,res){
    var name = req.body.name
    req.flash['FoodManage'] = "Add Food Name :  " + name + "  Success";
    mysql.insertFood(function(status){
       res.redirect('/manage/food');
     }, req.body.name);
  });

  router.get('/add/busi', isLoggedIn(), function(req,res){
    var data = {};
    mysql.getAllTypes(function(val1) {
      data.TypeList = val1;
      data.message = req.flash['err'];
      req.flash['err'] = "";
      res.render('add_busi.jade',data);
    });
  });

  router.post('/add/busi', isLoggedIn(), function(req,res){
    var busiName = req.body.name;
    if (fs.existsSync(path.resolve(__dirname, '../Static/pic/'+busiName+'.png'))){
      req.flash['err'] = "you are alredy have this business name";
      res.redirect("/add/busi");
    }
    var tempPath = req.files.file.path
    var targetPath = path.resolve(__dirname, '../Static/pic/'+busiName+'.png');
    var obj = req.body;
    obj.pic = '/pic/'+busiName+'.png';
    if (path.extname(req.files.file.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) {
              req.flash['err'] = err;
              res.redirect("/add/busi");
            };
            mysql.insertBusiness(function(status1){
              mysql.getLastId(function(val){
                mysql.insertBusiType(function(status2){
                res.redirect('/edit/busi/' +val[0].lastID);
              }, val[0].lastID, obj)
            });
          }, obj);
        });
    } else {
        fs.unlink(tempPath, function (err) {
            if (err) console.log(err);
            req.flash['err'] = "only png file";
            res.redirect("/add/busi");
        });
    }
    
  });
  
  router.get('/add/menu/:busiID', isLoggedIn(), function(req,res){
    var id = req.params.busiID;
     mysql.getAllFood(function(val1){
       var data = {};
       data.food = val1;
       data.inf = id;
       res.render('add_menu.jade', data);
     });
  });
  
  router.post('/add/menu/:busiID', isLoggedIn(), function(req,res){
    var id = req.params.busiID;
    mysql.insertMenu(function(){
      mysql.getSpecificBusiness(function(val1){
        mysql.getAllFoodIn(function(val2){
          var data = {};
          data.BUSI = val1;
          data.menu = val2;       
          res.render('edit_business.jade', data);
        }, id);
      }, id);
     }, req.body, id);
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
  
  router.post('/update/busi_name/:bsID', isLoggedIn(), function(req,res){
      var id = req.params.bsID;
      mysql.update_business_name(function(){
          res.redirect('/edit/busi/'+id)
      }, id, req.body.newName);
  });
  
  router.post('/update/menu/:bsID', isLoggedIn(), function(req,res){
    var id = req.params.bsID;
    mysql.update_business_menu(function(result){
      res.redirect('/edit/busi/'+id);
    },req.body);
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
