const express = require('express');
const router = express.Router();
const uploader = require('../configs/multer.config');
const registerController = require('../controller/register.controller');
const middlewares = require('../middlewares/auth.middleware');

router.post('/', registerController.createUser); // CREATE
// router.put('/:userId', userController.updateUser); // UPDATE

module.exports = router;
