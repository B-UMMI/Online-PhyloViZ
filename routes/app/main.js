var express = require('express');
var router = express.Router();
var parseGoe = require('goeBURSTparser');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query.springLength);
  springLength = 50;
  if (req.query.springLength != undefined) springLength = req.query.springLength;
  if (req.query.precompute != undefined) res.render('main', { 
  	title: 'PHYLOViZ Online', 
  	precompute: req.query.precompute, 
  	datasetName: req.query.datasetName, 
  	springLength : springLength,
  	isAuthenticated: req.isAuthenticated(), //function given by passport
    user: req.user //also given by passport. an user object
  });
  else res.render('main', { 
  	title: 'PHYLOViZ Online', 
  	precompute: false, 
  	datasetName: req.query.datasetName, 
  	springLength : springLength,
  	isAuthenticated: req.isAuthenticated(), //function given by passport
    user: req.user //also given by passport. an user object
  });


});


module.exports = router;