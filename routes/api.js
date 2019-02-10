var express = require('express');
var router = express.Router();
var userRoutes = require('./users.js');
var authController = require('../controllers/authController');

router.use('/users', userRoutes);


module.exports = router;