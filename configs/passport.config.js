const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models/user.model');
const createError = require('http-errors');

module.exports.setup = passport => {
    
    passport.serializeUser((user, next)=>{
        next(null, user._id);
    });
    
    passport.deserializeUser((id, next)=>{
        User.findById(id)
        .then(user => {
            next(null, user);
        })
        .catch(error => {
            console.log(1, error);
            next(error);
        });
    });
    
    passport.use('auth-local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },(email, password, next) =>{        
        User.findOne({email: email})
        .then(user =>{
            if (user) {
                console.log(user);
                
                return user.checkPassword(password)
                .then(match =>{
                    if(match){
                        next(null, user);
                    } else{                        
                        throw createError(401, 'CODE_002'); // INVALID EMAIL OR PASSWORD
                    }
                });
            } else {
                console.log('WRONG PASSWORD');
                
                throw createError(401, `invalid email or password`);
            }
        })
        .catch(error =>{
            next(error);
        });
    }));
};