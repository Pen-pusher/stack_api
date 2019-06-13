var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');
var Question = mongoose.model('Question');

module.exports = {

  // List all answers from a question
  listAnswers: (req, res) => {
    Answer.find({questionId: req.params.id})
    .populate({
      path: 'authorId',
      select: {salt: 0, password: 0}
    })
    .exec((err, answers) => {
      if(err) return res.status(500).json(err);
      res.status(200).json(answers);
    })
  },

  // Post answer on a question
  createAnswer: (req, res) => {
    req.body.questionId = req.params.id;
    req.body.authorId = req.user.id;
    Answer.create(req.body, (err, answer) => {
      if(err) return res.status(500).json(err);
      Question.findByIdAndUpdate(req.params.id, {$push: {answers: answer.id}}, (err, question) => {
        if(err) return res.status(500).json(err);
        res.status(200).json(answer);      
      })
    });
  },

  // Upvote an answer
  upvoteAnswer: (req, res) => {
    const ansId = req.params.id;
    const qId = req.params.qid;
    Answer.findByIdAndUpdate(ansId, {$inc: {upvote: 1}})
    .then(answer => {
      res.redirect(`/api/v1/questions/${qId}`);
    })
  },
  
  // Downvote answer
  downvoteAnswer: (req, res) => {
    const ansId = req.params.id;
    const qId = req.params.qid;
    Answer.findByIdAndUpdate(ansId, {$inc: {upvote: -1}})
    .then(answer => {
      res.redirect(`/api/v1/questions/${qId}`);
    })
  },
};