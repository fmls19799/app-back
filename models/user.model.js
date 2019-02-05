const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'The email is required',
        unique: 'This email already exists',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: 'The password is required'
    },
    name: {
        type: String
    },
    image: {
        type: String,
    }

}, {timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    }
});

userSchema.pre('save', function(next){
    if (!this.isModified('password')) {        
        next();
    } else{       
        bcrypt.genSalt(SALT_WORK_FACTOR)
        .then(salt =>{
            return bcrypt.hash(this.password, salt);
        })
        .then(hash =>{
            this.password = hash;            
            next();
        })
        .catch(error => {
            next(error);
        });
    }
});

userSchema.methods.checkPassword = function(password){
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
