var express = require('express');
var router = express.Router();

const asyncHandler = require('express-async-handler')
const PublicService = require('../services/publicService');


router.get('/', function(req, res, next) {
	return res.apiSuccess({data : "Working Public"});
});

// -------------  HOME PAGE  ---------------  //
router.get('/allUsers', asyncHandler((req, res, next) => {return PublicService.allUsers(req, res)}))




module.exports = router;