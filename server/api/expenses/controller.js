'use strict';

exports.GetModel = function(req, res) {
  var modelId = req.params.id;
  var Model = require('./model')(modelId);
  
  return res.status(200).json(Model);
};

function handleError(res, err) {
  return res.status(500).send(err);
}