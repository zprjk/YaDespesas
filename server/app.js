/**
 * Main application file
 */
'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
// var methodOverride = require('method-override');
// var path = require('path');

var app = express();
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.set('views', config.root + '/server/views');
// app.engine('html', require('ejs').renderFile);
// app.set('appPath', path.join(config.root, 'client'));
// app.use(express.static(path.join(config.root, '.tmp')));
// app.use(express.static(path.join(config.root, 'client')));
// app.set('appPath', path.join(config.root, 'client'));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//Set Routes
require('./routes')(app);

var server = require('http').createServer(app);

// var sqlite3 = require('sqlite3').verbose();
// var dbPath = path.join( __dirname ,'data', 'test.sqlite');

// var db = new sqlite3.Database(dbPath);

// db.serialize(function() {
//   // db.run('CREATE TABLE user (info TEXT)');

//   // var stmt = db.prepare('INSERT INTO Months VALUES id, monthYear');
//   // for (var i = 0; i < 1; i++) {
//   //     stmt.run(1, 200);
//   // }
//   // stmt.finalize();
//   db.run('PRAGMA foreign_keys = ON;');
//   // db.run('INSERT INTO Month VALUES (1, 2014)');
//   // db.run('INSERT INTO Expense Values(null,1,2015,1,1,750)')

//   // db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
//   //     // console.log(row.id + ': ' + row.info);
//   //     i++;
//   // }, function() {
//   // 	console.log('end ', i);
//   // });

// 	// console.time('query');
// 	// db.all('SELECT L.info FROM lorem AS L', function(err, rows) {
// 	//       // console.log(row.id + ': ' + row.info);
// 	//       console.log(rows.length);
// 	//       console.timeEnd('query');
// 	//   });
// 	// });

// });

// db.close();

// Start server
server.listen(3000, 'localhost', function() {
  console.log('Express server listening on %d, in %s mode', 3000, 'localhost');
});

