var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User');

var questionSchema = new Schema({
  title: { type: String, required: true, index: true },
  description: { type: String, required: true },
  upvote: { type: Number, default: 0 },
  stars: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  authorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  answers: [ { type: Schema.Types.ObjectId, ref: 'Answer' } ],
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
}, {timestamps: true});

// Update users reputationScore
// questionSchema.post('save', function(next) {
  
// })

questionSchema.methods.updateUserRepo = (id) => {
  User.findByIdAndUpdate(id, {$inc: {upvote: 1}}, (err, user) => {
    console.log('user updated after upvote', user);
  });
  return;
}

module.exports = mongoose.model('Question', questionSchema);