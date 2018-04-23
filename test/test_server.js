var expect = require("chai").expect;
var server = require("../server.js");
var model = require("../client/Models/we_can_eat.js")
var http = require('http');
var assert = require('assert')

///////////////////////////////////////////////////////////
// test by cd to this folder and $ mocha test_server.js  //
///////////////////////////////////////////////////////////

// test server [ controller , views ]
describe('client', function () {
    before(function () {
        server.listen(3000);
    });

    after(function () {
        server.close();
    });

  describe('/', function () {
    it("should return 200", function(done) {
        http.get('http://0.0.0.0:8080/', function (res) {
        assert.equal(200, res.statusCode);
        done();
        });
    });
  });
  
  describe('/home', function () {
    it("should return 200", function(done) {
        http.get('http://0.0.0.0:8080/home', function (res) {
        assert.equal(200, res.statusCode);
        done();
        });
    });
  });
  
    describe('/:tyID', function () {
    it("should return 200", function(done) {
        http.get('http://0.0.0.0:8080/2', function (res) {
        assert.equal(200, res.statusCode);
        done();
        });
    });
  });
  
  describe('/detail/:bsID', function () {
    it("should return 200", function(done) {
        http.get('http://0.0.0.0:8080/detail/2', function (res) {
        assert.equal(200, res.statusCode);
        done();
        });
    });
  });
  
});

