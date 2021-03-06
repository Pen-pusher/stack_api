var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var authController = require('../controllers/authController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:id/reputation', userController.calculateReputation)

router.use(authController.isTokenValid);

router.get('/', (req, res) => {
	res.json({hello: 'World!'})
});


router.get('/logout', userController.logoutUser);
router.get('/me', authController.isTokenValid, userController.userInfo);





module.exports = router;