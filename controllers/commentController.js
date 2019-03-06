var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');

module.exports = {
  createQuestionComment: (req, res) => {
    req.body.questionId = req.params.id;
    req.body.authorId = req.user.id;
    Comment.create(req.body, (err, comment) => {
      if(err) return res.status(500).json(err);
      Question
      .findByIdAndUpdate(req.params.id, {$push: {comments: comment.id}})
      .exec((err, question) => {
        if(err) return res.status(500).json(err);
        res.status(200).json(comment);
      });
    });
  },
  createAnswerComment: (req, res) => {
    req.body.answerId = req.params.id;
    req.body.authorId = req.user.id;
    Comment.create(req.body, (err, comment) => {
      if (err) return res.status(500).json(err);
      Answer
        .findByIdAndUpdate(req.params.id, {
          $push: {
            comments: comment.id
          }
        })
        .exec((err, answer) => {
          if (err) return res.status(500).json(err);
          res.status(200).json(comment);
        });
    });
  }
}