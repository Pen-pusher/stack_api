var mongoose = require('mongoose');
var Question = mongoose.model('Question');

module.exports = {
  listQuestions: (req, res) => {
    Question.find().sort({insertedAt: 1}).exec((err, questions) => {
      if(err) return res.status(500).json({error: err});
      res.status(200).json({questions: questions});
    })
  }, 
  createQuestion: (req, res) => {
    req.body.authorId = req.user.id;
    Question.create(req.body, (err, question) => {
      if(err) return res.status(500).json({error: err});
      res.status(200).json({question: question});
    });
  },
  showQuestion: (req, res) => {
    Question
    .findById(req.params.id)
    .populate({
      path: 'authorId', 
      select: {salt: 0, password: 0}
    })
    .populate({
      path: 'answers',
      select: {questionId: 0},
      populate:{
        path: 'authorId',
        select: {salt: 0, password: 0}
      }
    })
    .exec((err, question) => {
      if(err) return res.status(500).json({error: err});
      res.status(200).json({question: question});
    })
  }
};