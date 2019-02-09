require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const bodyparser = require ('body-parser');

require('./configs/db.config');

require('./configs/passport.config').setup(passport);
const corsConfig = require('./configs/cors.config');

const usersRouter = require('./routes/register.route');
const sessionsRouter = require('./routes/sessions.route');
const productsRouter = require('./routes/products.route');
const wishlistRouter = require('./routes/wishlist.route');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsConfig));
app.use(bodyparser.urlencoded({
  extended: true
}));


require("./configs/session.config")(app);

app.use(passport.initialize());
app.use(passport.session());

app.use('/register', usersRouter);
app.use('/sessions', sessionsRouter);
app.use('/products', productsRouter);
app.use('/wishlist', wishlistRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) { 
  next(createError(404)); 
}); 

app.use(function (error, req, res, next) {  
  console.log(123, error);
  
  res.status(error.status || 500);

  let errorsArray = [];
  
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400);
    
    for (field of Object.keys(error.errors)) {
      errorsArray.push(error.errors[field].message)
    }
  } else if (error instanceof mongoose.Error.CastError) {
    // HACER ESTO??? COMO ERA???
    error = createError(404, 'Resource not found');
  } else{
    for (field of Object.values(error)) {
      errorsArray.push(field)
    }
  }
  console.log(errorsArray);
  
  res.json(errorsArray);
});


module.exports = app;
