var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');
var Question = mongoose.model('Question');
var User = mongoose.model('User');

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
        res.redirect(`/api/v1/questions/${question.id}`)
      })
    });
  },

  // Upvote an answer
  upvoteAnswer: (req, res) => {
    const ansId = req.params.id;
    const qId = req.params.qid;
    if(req.user.auv.indexOf(ansId) > -1) {
      return res.json({error: {message: 'already upvoted answer'}})
    }
    Answer.findByIdAndUpdate(ansId, {$inc: {upvote: 1}})
    .then(answer => {
      req.user.updateAnswerVotes(answer.id, 1);
      User.findByIdAndUpdate(answer.authorId, {$inc: {reputationScore: 1}}, (err, user) => {});
      res.redirect(`/api/v1/questions/${qId}`);
    })
  },
  
  // Downvote answer
  downvoteAnswer: (req, res) => {
    const ansId = req.params.id;
    const qId = req.params.qid;
    if(req.user.adv.indexOf(ansId) > -1) {
      return res.json({error: {message: 'already downvoted answer'}})
    }
    Answer.findByIdAndUpdate(ansId, {$inc: {upvote: -1}})
    .then(answer => {
      req.user.updateAnswerVotes(answer.id, -1);
      User.findByIdAndUpdate(answer.authorId, {$inc: {reputationScore: -1}}, (err, user) => {});
      res.redirect(`/api/v1/questions/${qId}`);
    })
  },

  verifyAnswer: (req, res) => {
    const ansId = req.params.id;
    const qId = req.params.qid;
    Question.findById(qId)
    .then(question => {
      console.log(question.authorId, req.user.id);
      if (question.authorId.equals(req.user.id)) {
        Answer.findByIdAndUpdate(ansId, {verified: true})
        .then(answer => {
          return;
        })
        return res.redirect(`/api/v1/questions/${qId}`);
      }
      return res.status(403).json({error: {message: 'Unauthorized'}});
    })
    .catch(err => res.status(500).json(err))
  }
};