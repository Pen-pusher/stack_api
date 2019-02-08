const mongoose = require('mongoose'); 
const crypto = require('crypto');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: true
	},
	salt: String,
	password: String
}, {timestamps: true});


userSchema.pre('save', function(next) {
	// console.log('Inside pre')
	if(this.password) {
		// console.log('inside password')
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