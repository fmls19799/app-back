const createError = require('http-errors');
const mongoose = require('mongoose');
const WishProduct = require('./../models/wishProduct.model');
const moment = require('moment');

//GET WISHLIST OF ONE ISER
module.exports.getWishlistUser = (req, res, next) =>{
    WishProduct.find({user: req.params.userId})
    .populate('user')
    .populate('product')
    .then(wishProducts => {                
        res.status(200).json(wishProducts);
    })
    .catch(error =>{
        next(error);
    });
};