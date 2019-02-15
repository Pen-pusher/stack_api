var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');

module.exports = {
	isUser: (req, res, next) => {
		if(req.session.userId) {
			User.findById(req.session.userId, (err, user) => {
				req.isUser = true;
				req.user = user;
			});
			return next();
		}
		res.status(401).json({info: 'Please log In'});
	},
	isTokenValid: (req, res, next) => {
		var token = req.headers.token;
		if(!token) return res.status(403).json({error: 'Validation token is required'})
		jwt.verify(token, process.env.SECRET, (err, signed) => {
			if(err) return res.status(403).json(err);
			User.findById(signed.id, (err, user) => {
				if(err) return res.status(500).json(err);
				req.user = user;
				next();
			})
		})
	}
};