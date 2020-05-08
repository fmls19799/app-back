// IMPORT MODULES
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const createError = require('http-errors');
const corsConfig = require('./configs/cors.config');
const cors = require('cors');

// LOCAL VARIABLES
const PORT = process.env.PORT || 8080;

// INSTANTIATE EXPRESS APP
const app = express();

// IMPORT ROUTES
const registerRouter = require('./routes/register.route');
const userRouter = require('./routes/users.route');
const sessionsRouter = require('./routes/sessions.route');
const productsRouter = require('./routes/products.route');
const wishlistRouter = require('./routes/wishlist.route');

// CONNECT TO MONGODB
require('./configs/db.config');

// USES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsConfig));
app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({
//     extended: true
// }));

// ??????
app.use(express.static('www'))

// USE ROUTES
app.use('/register', registerRouter);
app.use('/sessions', sessionsRouter);
app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use('/wishlist', wishlistRouter);

// LISTEN TO PORT
app.listen(PORT, () => {
    console.log('SERVER STARTED AT PORT', PORT);
})


// CATCH ERRORS => catch 404 and forward to error handler
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
























