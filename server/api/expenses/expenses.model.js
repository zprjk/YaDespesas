'use strict';

var path = require('path'),
  moment = require('moment'),
  _ = require('lodash'),
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
    if (err) {
      db.close();
      return cb(err); //null if no error
    }

    //Update Debt values
    if (user.expensiveType === 'Colectiva') {
      db.all('SELECT user.id, user.name, debt.value FROM Debt as debt,User as user WHERE user.id=debt.user_id',
        function(err, rows) {
          var percentages = user.percentage.split('-'); // ['70', '30']

          var userPaying = _.find(rows, {
            'name': user.name
          });
          var otherUser = _.reject(rows, {
            'name': user.name
          })[0];
          console.log('');
          console.log(rows);

          var subValue = Number(user.value) * (Number(percentages[otherUser.id - 1]) / 100); // 100 * 0.7(70%)
          var calc = userPaying.value - subValue;

          if (calc < 0) {
            otherUser.value = Number(otherUser.value) + Math.abs(calc);
            userPaying.value = 0;
          } else
            userPaying.value = calc;

          // UPDATE Debt SET value = 10 WHERE user_id=2
          db.run('UPDATE Debt SET value=? WHERE user_id=?', rows[0].value, rows[0].id,
            function(err) {
              if (err)
                return cb(err);

              db.run('UPDATE Debt SET value=? WHERE user_id=?', rows[1].value, rows[1].id,
                function(err) {

                  console.log('');
                  console.log(rows);

                  db.close();
                  return cb(err); //null if no error
                });
            });
        });
    } else {
      db.close();
      return cb(err);
    }
  });
}

exports.GetYears = function(cb) {
  var db = new sqlite3.Database(dbPath);
  db.run('PRAGMA foreign_keys = ON;');

  db.all('SELECT id FROM Year', function(err, rows) {
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

  var query = 'SELECT expense.id, user.name as username, expenseType.name as percentage, value, description, date ';
  query += 'FROM Expense AS expense, User AS user, ExpensiveType AS expenseType ';
  query += 'WHERE user.id=expense.user_id ';
  query += 'AND expense.expenseType_id=expenseType.id ';
  query += 'AND expense.year_id=? ';
  query += 'AND expense.month_id=? ';

  db.all(query, year, month, function(err, rows) {
    db.close();
    return cb(err, rows);
  });
}

exports.DeleteEntry = function(entry, cb) {
  console.log(entry);
  var db = new sqlite3.Database(dbPath);
  db.run('PRAGMA foreign_keys = ON;');

  db.run('DELETE FROM Expense WHERE id=?', entry.id, function() {
    //Update Debt values
    if (_.includes(entry.percentage, '-')) {
      db.all('SELECT user.id, user.name, debt.value FROM Debt as debt,User as user WHERE user.id=debt.user_id',
        function(err, rows) {
          var percentages = entry.percentage.split('-'); // ['70', '30']

          var userPaying = _.find(rows, {
            'name': entry.username
          });
          var otherUser = _.reject(rows, {
            'name': entry.username
          })[0];
          console.log('');
          console.log(rows);

          var subValue = Number(entry.value) * (Number(percentages[otherUser.id - 1]) / 100); // 100 * 0.7(70%)
          var calc = userPaying.value - subValue;

          if (calc < 0) {
            otherUser.value = Number(otherUser.value) + Math.abs(calc);
            userPaying.value = 0;
          } else
            userPaying.value = calc;

          // UPDATE Debt SET value = 10 WHERE user_id=2
          db.run('UPDATE Debt SET value=? WHERE user_id=?', rows[0].value, rows[0].id,
            function() {

              db.run('UPDATE Debt SET value=? WHERE user_id=?', rows[1].value, rows[1].id,
                function() {
                  console.log('');
                  console.log(rows);
                });
            }
          );
        }
      );
    }
  });

  db.close(function(err) {
    return cb(err);
  });
}

exports.GetDebts = function(cb) {
  var db = new sqlite3.Database(dbPath);
  db.run('PRAGMA foreign_keys = ON;');

  db.all('SELECT user.id, user.name as username, debt.value FROM Debt as debt, User as user WHERE user.id=debt.user_id', function(err, rows) {
    db.close();
    return cb(err, rows);
  });
}

exports.SetDebts = function(users, cb) {
  var db = new sqlite3.Database(dbPath);

  console.log(users);
  db.run('PRAGMA foreign_keys = ON;');

  db.run('UPDATE Debt SET value=? WHERE user_id=?', users[0].value, users[0].id,
    function(err) {
      if (err)
        return cb(err);

      db.run('UPDATE Debt SET value=? WHERE user_id=?', users[1].value, users[1].id,
        function(err) {

          db.close();
          return cb(err); //null if no error
        });
    });
}

// function Initdb() {
//   var db = new sqlite3.Database(dbPath);
//    db.run('PRAGMA foreign_keys = ON;');

//    return db;
// }
