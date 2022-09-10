var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	return res.json({d : "Working User API"});
});


const asyncHandler = require('express-async-handler')
const UserService = require('../services/userService');



// API to login and register new user, dont required any auth in headers (check auth middleware)
router.post('/login', asyncHandler((req, res, next) => {return UserService.loginUser(req, res)}))
router.post('/register', asyncHandler((req, res, next) => {return UserService.registerUser(req, res)}))


// API to view user detail, required auth in headers  (check auth middleware)
router.get('/profile', asyncHandler((req, res, next) => {return UserService.profile(req, res)}))




module.exports = router;