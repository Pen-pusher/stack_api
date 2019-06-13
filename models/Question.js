var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  title: { type: String, required: true, index: true },
  description: { type: String, required: true },
  upvote: { type: Number, default: 0 },
  stars: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  authorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  answers: [ { type: Schema.Types.ObjectId, ref: 'Answer' } ],
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

module.exports = mongoose.model('Question', questionSchema);