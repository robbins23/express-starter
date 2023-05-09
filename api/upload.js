var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	return res.json({d : "Working Upload API"});
});


const asyncHandler = require('express-async-handler')
const UploadService = require('../services/uploadService')


router.post('/image', asyncHandler((req, res, next) => {return UploadService.updloadSingleFileToS3(req, res)}))




module.exports = router;