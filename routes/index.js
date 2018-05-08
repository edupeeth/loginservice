var express = require('express');
var router = express.Router();
var userService = require('./users');

router.use('/',userService);

module.exports = router;
