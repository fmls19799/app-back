const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const middleware = require('../middlewares/auth.middleware');
const uploader = require('./../configs/multer.config');

router.get('/', productController.findAllProducts);
router.get('/:productId/users/:userId', productController.getProductById); 
router.put('/:productId/users/:userId/like', productController.likeProduct);
router.put('/:productId/users/:userId/unlike', productController.unlikeProduct);
router.get('/users/:userId', productController.findItemsOfUser);//LO ESTOY USANDO???
router.post('/users/:userId/create', uploader.array('photos'), productController.createProduct);

// router.get('/:productId/users/:userId/isliking', productController.isLiking); //DEPRECATED


//  middleware.isAuthenticated NO ME DEJA PASAR, EL USER SE PONE AUTHENTICATED PERO LUEGO EN MIDDLWWARE NO VA???

router.delete('/:productId/delete', productController.deleteProductByUser);

module.exports = router;

