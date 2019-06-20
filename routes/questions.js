var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');
var questionController = require('../controllers/questionController');
var answerController = require('../controllers/answerController');
var commentController = require('../controllers/commentController');

// Questions routes
router.get('/', questionController.listQuestions);
router.get('/:id', questionController.showQuestion);

router.use(authController.isTokenValid);

router.post('/', questionController.createQuestion);
router.post('/:id/upvote', questionController.upvoteQuestion);
router.post('/:id/downvote', questionController.downvoteQuestion);
router.post('/:id/star', questionController.starQuestion)

// Answers routes
router.get('/:id/answers', answerController.listAnswers);
router.post('/:id/answers', answerController.createAnswer);
router.post('/:qid/answers/:id/upvote', answerController.upvoteAnswer);
router.post('/:qid/answers/:id/downvote', answerController.downvoteAnswer);
router.post('/:qid/answers/:id/verify', answerController.verifyAnswer);

// Question Comment route
router.post('/:id/comments', commentController.createQuestionComment);
// Answer Comment route

module.exports = router;