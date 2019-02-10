var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');

module.exports = {
	registerUser: (req, res) => {
		var {name, email, password} = req.body;
		if(!name || !email || !password) {
			return res.status(400).json({error: 'Name, email and password is required'});
		}
		User.create(req.body, (err, user) => {
			if(err) return res.status(500).json(err);
			res.status(200).json({success: `${user.email} created successfully`})
			// res.status(200).json({user: user});
		});
	},
	loginUser: (req, res) => {
	 		var {email, password} = req.body;
		 	User.findOne({email: email}, (err, user) => {
				if(err) return res.status(500).json(err);
				if(!user) return res.status(400).json({error: 'Incorrect email'});
				if(!user.validatePassword(password)) return res.status(400).json({error: 'Invalid password'});
				req.session.userId = user.id;
				var token = jwt.sign({id: user.id}, process.env.SECRET)
				res.json({email: user.email, token: token})
		});
	},
	logoutUser: (req, res) => {
		res.status(200).json({success: `${req.user.email} logged out successfully`})
		req.session.destroy();
	}
}
