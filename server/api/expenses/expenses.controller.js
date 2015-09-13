'use strict';

var model = require('./expenses.model');

exports.add = function(req, res) {
  var userData = req.body;

  model.add(userData);
  return res.status(200).json();
};

function handleError(res, err) {
  return res.status(500).send(err);
}