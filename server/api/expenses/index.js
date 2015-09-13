'use strict';

var express = require('express');
var controller = require('./expenses.controller');

var router = express.Router();

router.get('/', controller.GetYears);
router.get('/:year/:month', controller.GetMonths);
router.post('/add', controller.Add);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;