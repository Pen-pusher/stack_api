var express = require('express');
var router = express.Router();
var userRoutes = require('./users');
var questionRoutes = require('./questions');
var answerRoutes = require('./answers');
var tagRoutes = require('./tags'); 
var authController = require('../controllers/authController');

router.use('/users', userRoutes);
router.use('/questions', questionRoutes);
router.use('/answers', answerRoutes);
router.use('/tags', tagRoutes);


module.exports = router;