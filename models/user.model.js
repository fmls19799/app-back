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
        default: 'https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-512.png'
        // default: 'data:image/jpeg;base64,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'
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
