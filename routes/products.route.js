const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const middleware = require('../middlewares/auth.middleware');

// router.get('/create', middleware.notAuth, productController.create);
// router.post('/', middleware.notAuth, productController.doCreate);
router.post('/:userId/create', productController.createProduct);

// router.post('/delete', middleware.auth, productController.doDelete);

module.exports = router;

