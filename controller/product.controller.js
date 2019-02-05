const createError = require('http-errors');
const mongoose = require('mongoose');
const Product = require('./../models/product.model');
const moment = require('moment');

//CREATE PRODUCT
module.exports.createProduct = (req, res, next)=>{     
    // QUE HAGO CON REQ.FILES????? VER HOMEHACKER???
    const product = new Product(req.body);
    console.log(product);
    
    product.owner = req.params.userId;
    if (req.files) {            
        product.photos = []; // si quiero añadir a las que ya hay en product no inicializo array a vacio
        for (const file of req.files) {
            // url con la que podre acceder a la foto, cuando este en produccion metere en productos la url donde haya alojado previamente con MULTER??? la foto
            product.photos.push(`${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
            console.log(`${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
            
        }
    }
    product.save()
    .then((product)=>{   

        res.status(201).json(product);
    })
    .catch((error)=>{
        // console.log(9999, error);
        
        next(error);
    })
};

module.exports.findAllProducts = (req, res, next)=>{    
    
    Product.find()
    .populate('owner')
    .then(products => {    
        console.log(products);
            
        res.status(201).json(products);
    })
    .catch((error)=>{
        next(error);
    });
};

module.exports.findProductByUser = (req, res, next) =>{
    Product.find({owner: req.params.userId})
    .populate('owner')
    .then((products)=>{        
        res.status(200).json(products)
    })
    .catch((error)=>{
        next(error);
    })
}

module.exports.findOneProduct = (req, res, next) =>{    
    Product.findById(req.params.productId)
    .then((product)=>{                
        res.status(200).json(product)
    })
    .catch((error)=>{
        next(error);
    })
}

module.exports.deleteProductByUser = (req, res, next) =>{    
    Product.findByIdAndDelete(req.params.productId)
    .then(()=>{        
        res.status(204).json()
    })
    .catch((error)=>{
        next(error);
    })
}
