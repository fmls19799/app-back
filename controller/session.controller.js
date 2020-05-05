// const User = require('./../models/user.model');
// const mongoose = require('mongoose');
const createError = require('http-errors');
const passport = require('passport');

module.exports.doCreate = (req, res, next) =>{    
    const { email, password } = req.body;

    if (!email || !password) {
        throw createError(400, 'CODE_004'); // EMAIL OR PASSWORD EMPTY
    } else{
        passport.authenticate('auth-local', (error, user) =>{
            if (error) {
                next(error);
            } else {
                req.login(user, (error) =>{
                    if (error) {
                        next(error);
                    } else{
                        console.log(222, req.isAuthenticated());
                        
                        console.log(user);
                        res.status(200).json(user);    
                    }
                });
            }
        })(req, res, next);
    }
};

module.exports.delete = (req, res, next) =>{
    req.logout();
    res.status(204).json();
    console.log('YOU LOGGED OUT');
};
