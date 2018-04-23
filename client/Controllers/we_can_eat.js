module.exports.controller = function(router) {

// a home page route
  router.get('/', function(req, res) {
      res.render('index')
  });

  router.get('/home', function(req, res) {
      res.render('index')
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

