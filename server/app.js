/**
 * Main application file
 */
'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var bodyParser = require('body-parser');
// var methodOverride = require('method-override');
// var path = require('path');

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

// Start server
server.listen(3000, 'localhost', function() {
  console.log('Express server listening on %d, in %s mode', 3000, 'localhost');
});

