'use strict';

var express = require('express');
var controller = require('./expenses.controller');

var router = express.Router();

router.get('/', controller.GetYears);
router.get('/debts', controller.GetDebts);
router.post('/debts', controller.SetDebts);
router.get('/:year', controller.GetMonths);
router.get('/:year/:month', controller.GetMonthValues);
router.post('/add', controller.Add);
router.post('/remove/entry', controller.DeleteEntry);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/entry', controller.DeleteEntry);

module.exports = router;