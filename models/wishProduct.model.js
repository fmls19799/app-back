const mongoose = require('mongoose');

const wishProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
    
}, {timestamps: true,
    
});

const WishProduct = mongoose.model('WishProduct', wishProductSchema);

module.exports = WishProduct;
