var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Tag = mongoose.model('Tag');
var QuestionTag = mongoose.model('QuestionTag');

module.exports = {
  // List Questions
  listQuestions: (req, res) => {
    Question.find().sort({insertedAt: 1}).populate('authorId').exec()
      .then(questions => res.status(200).json({questions: questions}))
      .catch(err => res.status(500).json(err));
  }, 

  // Create Question
  createQuestion: (req, res) => {
    req.body.authorId = req.user.id;
    Question.create(req.body)
      .then(question => {
        if (req.body.tags && req.body.tags.length > 0) {
          req.body.tags.forEach(tagName => {
            Tag.findOneAndUpdate({name: tagName}, {}, {upsert: true, new: true}).exec()
              .then(tag => QuestionTag.create({
                tag: tag._id, question: question._id
              }))
          });
        }
        res.status(200).json({ question: question });
      })
      .catch(err => res.status(500).json(err))
      
  },

  //Show Question with answers and Comments
  showQuestion: (req, res) => {
    console.log(req.query);
    Question
    .findById(req.params.id)
    .populate({
      path: 'authorId', 
      select: {name: 1, username: 1, reputationScore: 1, updatedAt: 1}
    })
    .populate({
      path: 'answers',
      select: {questionId: 0},
      options: {sort: req.query},
      populate:[{
        path: 'authorId',
        select: {salt: 0, password: 0}
      },
      {
        path: 'comments',
        select: {description: 1, upvote: 1},
        populate:{
          path: 'authorId',
          select: {name: 1, updatedAt: 1}
        }
      }]
    })
    .populate({
      path: 'comments',
      select: {questionId: 0},
      populate:{
        path: 'authorId',
        select: {name: 1, updatedAt: 1}
      }
    })
    .exec((err, question) => {
      if(err) return res.status(500).json({error: err});
      QuestionTag
        .find({question: question._id})
        .populate({path: 'tag', select: {name: 1}})
        .exec((err, tags) => {
          res.status(200).json({ question: question, tags: tags});
      });
    });
  },

  // Upvote Question
  upvoteQuestion: (req, res) => {
    var id = req.params.id;
    if(req.user.quv.indexOf(id) > -1) {
      return res.status(301).json({error: {message: 'already upvoted'}})
    }
    Question.findByIdAndUpdate(id, {$inc: {upvote: 1}})
    .then(question => {
      req.user.quv.push(id);
      req.user.save();
      res.redirect(`/api/v1/questions/${question.id}`)
    })
    .catch(error => res.status(500).json(err));
  },

  // Downvote question
  downvoteQuestion: (req, res) => {
    var id = req.params.id;
    if(req.user.qdv.indexOf(id) > -1) {
      return res.status(301).json({error: {message: 'already downvoted'}})
    }
    Question.findByIdAndUpdate(id, {$inc: {upvote: -1}}, {new: true})
    .then(question => {
      req.user.qdv.push(id);
      req.user.save();
      res.redirect(`/api/v1/questions/${question.id}`)
    })
    .catch(error => res.status(500).json(err));  
  },

  // Star question
  starQuestion: (req, res) => {
    var id = req.params.id;
    if(req.user.starQ.indexOf(id) > -1) {
      return res.json({error: {message: 'already starred'}})
    }
    Question.findByIdAndUpdate(id, {$inc: {stars: 1}})
    .then(question => {
      req.user.starQ.push(id);
      req.user.save();
      res.redirect(`/api/v1/questions/${id}`)
    })
    .catch(error => res.status(500).json(err));
  }
};