var express = require('express');
var router = express.Router();
var userRoutes = require('./users');
var questionRoutes = require('./questions');
var authController = require('../controllers/authController');

router.use('/users', userRoutes);
router.use('/questions', authController.isTokenValid, questionRoutes);


module.exports = router;