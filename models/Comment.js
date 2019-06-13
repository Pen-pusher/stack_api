var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  description: { type: String, required: true },
  questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
  answerId: { type: Schema.Types.ObjectId, ref: 'Answer' },
  authorId: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
  upvote: { type: Number, default: 0 }
}, { timestamps: true } );

module.exports = mongoose.model('Comment', commentSchema);