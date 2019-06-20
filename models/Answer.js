var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
  description: { type: String, required: true},
  questionId: { type: Schema.Types.ObjectId, required: true, ref: 'Question' },
  upvote: { type: Number, default: 0 },
  authorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  verified: {type: Boolean, default: false}
}, { timestamps: true } );

module.exports = mongoose.model('Answer', answerSchema);