var express = require('express');
var router = express.Router();
var questionController = require('../controllers/questionController');
var answerController = require('../controllers/answerController');
var authController = require('../controllers/authController');

router.get('/', questionController.listQuestions);
router.post('/', questionController.createQuestion);
router.get('/:id', questionController.showQuestion);
router.post('/:id/answers', answerController.createAnswer);

module.exports = router;