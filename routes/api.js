var express = require('express');
var router = express.Router();
var userRoutes = require('./users.js')

router.use('/users', userRoutes);


module.exports = router;