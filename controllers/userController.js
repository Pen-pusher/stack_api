var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');
var jwt = require('jsonwebtoken');

module.exports = {
	registerUser: (req, res) => {
		var {name, email, password, username} = req.body;
		if(!name || !email || !password || !username) {
			return res.status(400).json({error: 'Name, email, password and username is required'});
		}
		User.create(req.body, (err, user) => {
			if(err) return res.status(500).json(err);
			res.status(200).json({success: `${user.email} created successfully`})
		});
	},
	loginUser: (req, res) => {
		console.log(req.body);
	 		var {email, password} = req.body;
		 	User.findOne({email: email}, (err, user) => {
				if(err) return res.status(500).json(err);
				if(!user) return res.status(400).json({error: 'Incorrect email'});
				console.log('before password');
				if(!user.validatePassword(password)) return res.status(400).json({error: 'Invalid password'});
				console.log('after password');
				var token = jwt.sign({id: user.id}, process.env.SECRET)
				res.status(200).json({email: user.email, token: token})
		});
	},
	logoutUser: (req, res) => {
		res.status(200).json({success: `${req.user.email} logged out successfully`})
		req.session.destroy();
	},
	userInfo: (req, res) => {
		var user = req.user;
		res.status(200).json(
			{
				id: user.id, 
				name: user.name, 
				email: user.email,
				username: user.username,
				photo: user.photo,
				score: user.reputationScore
			}
		);
	},

	calculateReputation: (req, res) => {
		var userId = req.params.id;
		var score = 0;
		User.findById(userId)
		.then(user => {
			Question.find({authorId: userId})
			.then(questions => {
				questions.forEach(elem => {
					score += elem.upvote;
				});
				Answer.find({authorId: userId})
				.then(answers => {
					answers.forEach(elem => {
						score += elem.upvote
					})
					user.reputationScore = score;
					user.save()
					return res.status(200).json(user);
				})
			})
		})
		.catch(err => res.json({error: err, message: 'cannot calculate reputation'}))
	}
};
