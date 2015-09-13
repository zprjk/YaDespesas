'use strict';

var path = require('path'),
  moment = require('moment'),
  sqlite3 = require('sqlite3').verbose();

var dbPath = path.join(__dirname, '..', '..', 'data', 'test.sqlite');

exports.Add = function(user, cb) {
  console.log('api/expenses/add data:', user);

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
  }, function(err) {
    db.close();
    return cb(err); //null if no error
  });

  // db.close();
  // return cb();
}

exports.GetYears = function(cb) {
  var db = new sqlite3.Database(dbPath);
  db.run('PRAGMA foreign_keys = ON;');

  db.all('SELECT id FROM year', function(err, rows) {
    db.close();
    return cb(err, rows);
  });

  // db.close();
}

exports.GetMonths = function(user) {
  // console.log('api/expenses/add data:', user);

  // var date = moment(new Date(user.date));
  // var month = date.month();
  // var year = date.year();

  // var db = new sqlite3.Database(dbPath);
  // db.run('PRAGMA foreign_keys = ON;');

  // db.run('INSERT OR IGNORE INTO Year VALUES (?)', year);
  // db.run('INSERT OR IGNORE INTO Month VALUES (?, ?)', month, year);

  // db.all('SELECT id FROM year';

  // db.close();
}

// function Initdb() {
//   var db = new sqlite3.Database(dbPath);
//    db.run('PRAGMA foreign_keys = ON;');

//    return db;
// }
