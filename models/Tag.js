var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
  name: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: String,
  slug: String 
}, { timestamps: true } );

tagSchema.pre('save', function(next) {
  if(this.name && this.isModified(this.name)) {
    this.slug = this.name.trim().split(" ").join("-");
    next();
  }
  next();
});

module.exports = mongoose.model('Tag', tagSchema);