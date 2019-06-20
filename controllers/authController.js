var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');

module.exports = {
	isTokenValid: (req, res, next) => {
		var token = req.headers.authorization;
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