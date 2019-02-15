var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');
var Question = mongoose.model('Question');

module.exports = {
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
  }
};