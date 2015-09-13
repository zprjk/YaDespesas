'use strict';

var path = require('path'),
  moment = require('moment'),
  sqlite3 = require('sqlite3').verbose();

var dbPath = path.join(__dirname, '..', '..', 'data', 'test.sqlite');

exports.add = function(user) {
  console.log('api/add data:', user);

  var date = moment(new Date(user.date));
  var month = date.month();
  var year = date.year();

  var db = new sqlite3.Database(dbPath);
  db.run('PRAGMA foreign_keys = ON;');

  db.run('INSERT OR IGNORE INTO Year VALUES (?)', year);
  db.run('INSERT OR IGNORE INTO Month VALUES (?, ?)', month, year);

  db.run('INSERT INTO Expense VALUES ($id, (SELECT id FROM User WHERE name=$username), $year, $month, (SELECT id FROM ExpensiveType WHERE name=$percentage), $value, $description, $date)', {
    $id: null,
    $username: user.name,
    $year: year,
    $month: month,
    $percentage: user.percentage,
    $value: user.value,
    $description: user.description,
    $date: user.date
  });

  db.close();
}
