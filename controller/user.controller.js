
const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const moment = require('moment');

module.exports.updateUser = (req, res, next) =>{
    if(req.file){        
        criteria = { $set: req.body, image: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`}
    } else{
        criteria = { $set: req.body};
    }
    User.findByIdAndUpdate(req.params.userId, criteria, { runValidators: true, new: true })
    .then((user)=>{        
        res.status(201).json(user);
    })
    .catch((error)=>{        
        next(error);
    })
};
