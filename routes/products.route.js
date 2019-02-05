const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const middleware = require('../middlewares/auth.middleware');
const uploader = require('./../configs/multer.config');

// router.post('/', middleware.notAuth, productController.doCreate);
router.get('/', productController.findAllProducts);
router.get('/:productId', productController.findOneProduct);
router.post('/users/:userId/create', uploader.array('photos'), productController.createProduct);
router.get('/users/:userId', productController.findProductByUser);


//  middleware.isAuthenticated NO ME DEJA PASAR, EL USER SE PONE AUTHENTICATED PERO LUEGO EN MIDDLWWARE NO VA???

router.delete('/:productId/delete', productController.deleteProductByUser);

module.exports = router;

