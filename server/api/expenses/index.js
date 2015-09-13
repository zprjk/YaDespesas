'use strict';

var express = require('express');
var controller = require('./expenses.controller');

var router = express.Router();

// router.get('/', controller.index);
// router.get('/:id', controller.GetModel);
router.post('/add', controller.add);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;