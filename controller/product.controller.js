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
        console.log('1');
        next(error);
    })
    //     User.findOne({email:req.body.email})
    //     .then(user=>{
    //         if (user) {
    //             throw createError(409, 'CODE_003');
    //         } else{
    //             user = new User(req.body);            
    //             user.save()
    //             .then(user => {
    //                 res.status(201).json(user);
    //             })
    //             .catch(error => {
    //                 next(error);
    //             });
    //         }
    //     })
    //     .catch(error => {
    //         next(error);
    //     });
    
    
    
    
    // let stringToArrayCoords = req.body.location.split(',');
    
    // const house = new House(req.body);
    // house.location.coordinates = stringToArrayCoords;
    // house.owner = req.params.userId;
    
    // if (req.files) {            
    //     house.photos = [];
    //     for (const file of req.files) {
    //         house.photos.push(`${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
    //     }
    // }
    
    // house.save()
    // .then(house => {    
    //     console.log(house);
    
    //     res.status(201).json(house);
    // })
    // .catch(error => {
    //     next(error);
    // });
    
    
};
