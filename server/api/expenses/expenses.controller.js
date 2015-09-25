'use strict';

var model = require('./expenses.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

exports.Add = function(req, res) {
  var userData = req.body;

  model.Add(userData, function(err) {
    if (err)
      handleError(res, err);

    return res.status(200).json();
  });
};

exports.GetYears = function(req, res) {
  model.GetYears(function(err, years) {
    if (err)
      handleError(res, err);

    return res.status(200).json(years);
  });
};

exports.GetMonths = function(req, res) {
  var year = req.params.year;

  model.GetMonths(year, function(err, months) {
    if (err)
      handleError(res, err);

    return res.status(200).json(months);
  });
};

exports.GetMonthValues = function(req, res) {
  var year = req.params.year;
  var month = req.params.month;

  model.GetMonthValues(year, month, function(err, values) {
    if (err)
      handleError(res, err);

    return res.status(200).json(values);
  });
};

exports.DeleteEntry = function(req, res) {
  var entry = req.body;

  model.DeleteEntry(entry, function(err) {
    if (err)
      handleError(res, err);

    return res.status(200).json();
  });
};

exports.GetDebts = function(req, res) {
  model.GetDebts(function(err, debts) {
    if (err)
      handleError(res, err);

    return res.status(200).json(debts);
  });
}

exports.SetDebts = function(req, res) {
  var users = req.body;

  model.SetDebts(users, function(err) {
    if (err)
      handleError(res, err);

    return res.status(200).json();
  });
}
