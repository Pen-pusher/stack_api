var express = require('express');
var router = express.Router();
var questionController = require('../controllers/questionController');
var answerController = require('../controllers/answerController');
var commentController = require('../controllers/commentController');

router.post('/:id/comments', commentController.createAnswerComment);



module.exports = router;