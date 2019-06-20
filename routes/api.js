var express = require('express');
var router = express.Router();
var userRoutes = require('./users');
var questionRoutes = require('./questions');
var answerRoutes = require('./answers');
var tagRoutes = require('./tags'); 
var authController = require('../controllers/authController');
var Question = require('../models/Question');

router.use('/users', userRoutes);
router.use('/questions', questionRoutes);
router.use('/answers', authController.isTokenValid, answerRoutes);
router.use('/tags', tagRoutes);

router.get('/search', (req, res) => {
  Question.find({$text: {$search: req.query.q}})
  .sort({insertedAt: 1}).populate('authorId').exec()
  .then(questions => res.status(200).json({questions: questions}))
  .catch(err => res.status(500).json(err));
})


module.exports = router;