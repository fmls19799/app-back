const createError = require('http-errors');
const mongoose = require('mongoose');
const Product = require('./../models/product.model');
const moment = require('moment');

//CREATE PRODUCT
module.exports.createProduct = (req, res, next)=>{        
    const product = new Product(req.body);
    
    product.save()
    .then((product)=>{
        res.status(201).json(product);
    })
    .catch((error)=>{
        next(error);
    })
};

module.exports.findAllProducts = (req, res, next)=>{    
    
    Product.find()
    .then(products => {
        console.log(products.length);
        
        res.status(201).json(products);
    })
    .catch((error)=>{
        next(error);
    });
};
