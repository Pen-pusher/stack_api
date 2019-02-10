var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var userController = require('../controllers/userController');
var authController = require('../controllers/authController');

router.get('/', authController.isTokenValid, (req, res) => {
	console.log(req.user)
	res.json({hello: 'World!'})
});

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', authController.isUser, userController.logoutUser);
router.get('/me', authController.isTokenValid, userController.userInfo);





module.exports = router;