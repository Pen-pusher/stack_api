const mongoose = require('mongoose'); 
const crypto = require('crypto');
const Schema = mongoose.Schema;
const Question = require('./Question');
const Answer = require('./Answer');

const userSchema = new Schema({
	name: { type: String, required: true, trim: true },
	email: { type: String, unique: true, lowercase: true, trim: true, required: true },
	username: {type: String, unique: true, lowercase: true, trim: true, required: true},
	age: Number,
	salt: String,
	password: String,
	description: String,
	address: {
		street: String,
		city: String,
		state: String,
		pincode: {type: String, minLength: 5, maxLength: 6}
	},
	githubUrl: String,
	twitterUrl: String,
	personalWebsiteUrl: String,
	reputationScore: {type: Number, default: 0},
	photo: String,
	quv: [{type: Schema.Types.ObjectId, ref: 'Question'}],
	qdv: [{type: Schema.Types.ObjectId, ref: 'Question'}],
	auv: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
	adv: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
	starQ: [{type: Schema.Types.ObjectId, ref: 'Question'}]
}, {timestamps: true});


userSchema.pre('save', function(next) {
	if(this.password && this.isModified('password')) {
		this.salt = crypto.randomBytes(16).toString('hex');
  	this.password = crypto.pbkdf2Sync(this.password, this.salt, 10000, 64, 'sha512').toString('hex');
	}
	next();
});

userSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
  return this.password === hash;
};

module.exports = mongoose.model('User', userSchema);