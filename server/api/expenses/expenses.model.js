'use strict';

var path = require('path'),
  moment = require('moment'),
  sqlite3 = require('sqlite3').verbose();

var dbPath = path.join(__dirname, '..', '..', 'data', 'test.sqlite');

exports.Add = function(user, cb) {
  console.log(user);

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
}

exports.GetYears = function(cb) {
  var db = new sqlite3.Database(dbPath);
  db.run('PRAGMA foreign_keys = ON;');

  db.all('SELECT id FROM year', function(err, rows) {
    db.close();
    return cb(err, rows);
  });
}

exports.GetMonths = function(year, cb) {
  var db = new sqlite3.Database(dbPath);
  db.run('PRAGMA foreign_keys = ON;');

  db.all('SELECT id FROM Month WHERE year_id=?', year, function(err, rows) {
    db.close();
    return cb(err, rows);
  });
}

exports.GetMonthValues = function(year, month, cb) {
  var db = new sqlite3.Database(dbPath);
  db.run('PRAGMA foreign_keys = ON;');

  var query	= 'SELECT user.name as username, expenseType.name as percentage, value, description, date ';
  query		 += 'FROM Expense AS expense, User AS user, ExpensiveType AS expenseType ';
  query 	 += 'WHERE user.id=expense.user_id ';
  query 	 += 'AND expense.expenseType_id=expenseType.id ';
  query 	 += 'AND expense.year_id=? ';
  query		 += 'AND expense.month_id=? ';

  db.all(query, year, month, function(err, rows) {
    db.close();
    return cb(err, rows);
  });
}

// function Initdb() {
//   var db = new sqlite3.Database(dbPath);
//    db.run('PRAGMA foreign_keys = ON;');

//    return db;
// }
