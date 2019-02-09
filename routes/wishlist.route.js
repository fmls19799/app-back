const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/wishlist.controller');
const middleware = require('../middlewares/auth.middleware');

router.get('/user/:userId', wishlistController.getWishlistUser);

module.exports = router;
