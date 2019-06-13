var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionTagSchema = new Schema({
  tag: {type: Schema.Types.ObjectId, ref: 'Tag'},
  question: {type: Schema.Types.ObjectId, ref: 'Question'}
});

module.exports = mongoose.model('QuestionTag', questionTagSchema);