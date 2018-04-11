// ต้องมีการเรียกใช้งาน Js ที่จะดึงข้อมูลจากฐานข้อมูลจาก Models อีก แต่ยังไม่แน่ใจทำไง
//var mongoose = require('mongoose') << fix to mysql ?
//var Video = require('../models/user'); << models/we_can_eat ?

module.exports.controller = function(router) {

/**
 * a home page route
 */
  router.get('/', function(req, res) {
      res.render('index')
  });

  router.get('/home', function(req, res) {
      res.render('index')
  });

/**
 * detail page
 */
  router.get('/detail', function(req, res) {
      res.render('detail')
  });

}


//router.get('/detail', function (req, res) {
//   res.sendfile(path.resolve(__dirname, 'client/html/detail.html'));
//}); << ของเก่า
