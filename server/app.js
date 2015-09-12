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
//   // db.run('CREATE TABLE user (info TEXT)');

//   // var stmt = db.prepare('INSERT INTO lorem VALUES (?)');
//   // for (var i = 0; i < 30000; i++) {
//   //     stmt.run("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sollicitudin pharetra purus. Quisque nisl ligula, gravida ac massa non, tristique rhoncus nisl. Sed fringilla turpis id ante sollicitudin congue sit amet ut enim. Aliquam eu purus et lectus fringilla fringilla eu sit amet dolor. Vestibulum suscipit, quam at cursus lacinia, augue nulla placerat lacus, sit amet iaculis ipsum velit at dolor. Pellentesque ante neque, bibendum ut sem in, dapibus commodo magna. Aenean tellus purus, tempus in lacinia id, dapibus quis ligula. Cras ante felis, commodo in dignissim facilisis, blandit nec justo. Vestibulum at ligula molestie, lacinia ex et, iaculis elit. Quisque accumsan maximus venenatis. Donec scelerisque, odio nec dignissim eleifend, eros nisi sodales nulla, vel pretium lacus nunc nec lectus. Donec pretium enim libero, nec tristique magna tempus luctus. Suspendisse eu nisl at orci imperdiet pharetra at vitae sem. Aenean porta molestie egestas. Donec eu nunc lacus. Vestibulum in neque vel magna pharetra venenatis." + i);
//   // }
//   // stmt.finalize();

//   // db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
//   //     // console.log(row.id + ': ' + row.info);
//   //     i++;
//   // }, function() {
//   // 	console.log('end ', i);
//   // });

// 	console.time('query');
// 	db.all('SELECT L.info FROM lorem AS L', function(err, rows) {
// 	      // console.log(row.id + ': ' + row.info);
// 	      console.log(rows.length);
// 	      console.timeEnd('query');
// 	  });
// 	});

// db.close();

// Start server
server.listen(3000, 'localhost', function() {
  console.log('Express server listening on %d, in %s mode', 3000, 'localhost');
});

