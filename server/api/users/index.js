'use strict';

var express = require('express');
var controller = require('./users.controller');

var router = express.Router();

router.get('/', controller.GetUsers);

module.exports = router;