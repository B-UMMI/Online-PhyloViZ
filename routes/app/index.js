var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('indexApp', { 
  	  title: 'PHYLOViZ Online',
      isAuthenticated: req.isAuthenticated(), //function given by passport
      user: req.user //also given by passport. an user object
  });

});

module.exports = router;
