const createError = require('http-errors');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const moment = require('moment');

module.exports.isAuthenticated = (req, res, next) =>{ 
   
  if(req.isAuthenticated()){      
    console.log('you are authh back');
    next();
  } else{  
    console.log('you are not auth back');
    throw createError(403);
  }
};
