'use strict';

var path = require('path'),
  sqlite3 = require('sqlite3').verbose();

var dbPath = path.join(__dirname, '..', '..', 'data', 'data.sqlite');

exports.GetUsers = function(cb) {
  var db = new sqlite3.Database(dbPath);
  db.run('PRAGMA foreign_keys = ON;');

  db.all('SELECT name FROM User', function(err, rows) {
    db.close();
    return cb(err, rows);
  });
}
