/**
 * Main application file
 */
'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var bodyParser = require('body-parser');
// var methodOverride = require('method-override');
var path = require('path');

var app = express();
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.set('views', config.root + '/server/views');
// app.engine('html', require('ejs').renderFile);
// app.set('appPath', path.join(config.root, 'client'));
// app.use(express.static(path.join(config.root, '.tmp')));
// app.use(express.static(path.join(config.root, 'client')));
// app.set('appPath', path.join(config.root, 'client'));

//Set Routes
require('./routes')(app);

var server = require('http').createServer(app);

// var sqlite3 = require('sqlite3').verbose();
// var dbPath = path.join( __dirname ,'data', 'data.sqlite');

// var db = new sqlite3.Database(dbPath);

// db.serialize(function() {
//   db.run('CREATE TABLE lorem (info TEXT)');

//   var stmt = db.prepare('INSERT INTO lorem VALUES (?)');
//   for (var i = 0; i < 10; i++) {
//       stmt.run('Ipsum ' + i);
//   }
//   stmt.finalize();

//   db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
//       console.log(row.id + ': ' + row.info);
//   });
// });

// db.close();

// Start server
server.listen(3000, 'localhost', function() {
  console.log('Express server listening on %d, in %s mode', 3000, 'localhost');
});

