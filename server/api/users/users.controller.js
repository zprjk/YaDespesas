'use strict';

var users = require('./users.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

exports.GetUsers = function(req, res) {
  users.GetUsers(function(err, users){
  	if(err)
  		handleError(res, err);

  	return res.status(200).json(users);
  });
};