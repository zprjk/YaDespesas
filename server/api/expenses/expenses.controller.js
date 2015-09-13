'use strict';

var model = require('./expenses.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

exports.Add = function(req, res) {
  var userData = req.body;

  model.Add(userData, function(err){
  	if(err)
  		handleError(res, err);

  	return res.status(200).json();
  });
};


exports.GetYears = function(req, res) {
  model.GetYears(function(err, years){
  	if(err)
  		handleError(res, err);

  	return res.status(200).json(years);
  });
};

exports.GetMonths = function(req, res) {
  // var year = req.param.year;

  // model.GetMonths(userData, function(err){
  // 	if(err)
  // 		handleError(res, err);

  // 	return res.status(200).json();
  // });
};