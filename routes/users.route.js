const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const middleware = require('../middlewares/auth.middleware');
const uploader = require('./../configs/multer.config');

router.put('/:userId/update' , uploader.single('image'), userController.updateUser); // UPDATE

module.exports = router;

