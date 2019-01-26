const express = require('express');
const router = express.Router();
const uploader = require('../configs/multer.config');
const userController = require('../controller/user.controller');
const middlewares = require('../middlewares/auth.middleware');

router.post('/', userController.createUser); // CREATE
module.exports = router;
