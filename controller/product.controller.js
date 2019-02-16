const createError = require('http-errors');
const mongoose = require('mongoose');
const Product = require('./../models/product.model');
const WishProduct = require('./../models/wishProduct.model');
const moment = require('moment');

//CREATE PRODUCT
module.exports.createProduct = (req, res, next)=>{     
    // QUE HAGO CON REQ.FILES????? VER HOMEHACKER???    
    const product = new Product(req.body);    
    product.owner = req.params.userId;
    if (req.files) {            
        product.photos = []; // si quiero añadir a las que ya hay en product no inicializo array a vacio
        for (const file of req.files) {
            // url con la que podre acceder a la foto, cuando este en produccion metere en productos la url donde haya alojado previamente con MULTER??? la foto
            product.photos.push(`${req.protocol}://${req.get('host')}/uploads/${file.filename}`);            
        }
    }
    product.save()
    .then((product)=>{   
        
        res.status(201).json(product);
    })
    .catch((error)=>{        
        next(error);
    })
};

module.exports.findAllProducts = (req, res, next)=>{  
    // ESTO???  
    console.log(req.query);
    console.log(req.params);
    criteria = {};
    if (req.query.type) {
        criteria.type = req.query.type;
    } else if(req.query.rentOrBuy){
        criteria.rentOrBuy = req.query.rentOrBuy;
    }
    
    let skipping;
    let limit = 10;
    
    if (req.query.page === 1) {
        skipping = 0;
    } else{
        skipping = limit * (req.query.page - 1)
    }
    // ESTO???
    // {$and:[{start:{$gte:req.query.start}},{end:{$lte:req.query.end}}]}]}
    // Product.find({owner: { $ne: req.params.userId }})
    // Product.find({owner: { $ne: req.params.userId }}).skip(skipping).limit(limit)
    // Product.find({$and: [{owner: { $ne: req.params.userId }}, criteria]}).skip(skipping).limit(limit)
    Product.find(criteria).skip(skipping).limit(limit)
    // .populate('owner')
    .then(products => {   
        console.log(products);
        
        res.status(201).json(products);
    })
    .catch((error)=>{
        next(error);
    });
};


// ESTO??????
// module.exports.findAllProducts = (req, res, next)=>{  
//     Product.find({owner: { $ne: req.params.userId }})
//     .populate('owner')
//     .then(products => {           
//         res.status(201).json(products);
//     })
//     .catch((error)=>{
//         next(error);
//     });
// };


module.exports.findItemsOfUser = (req, res, next) =>{
    Product.find({owner: req.params.userId})
    .populate('owner')
    .then((products)=>{        
        res.status(200).json(products)
    })
    .catch((error)=>{
        next(error);
    })
}

module.exports.getProductById = (req, res, next) =>{    
    console.log(req.params);
    
    Promise.all([
        Product.findById(req.params.productId).populate('owner'),
        WishProduct.findOne({ $and: [ { user: req.params.userId}, { product: req.params.productId}] })
    ])
    .then(([product, wishRelationship])=>{
        if (wishRelationship === null) {
            liking = false;
        } else{
            liking = true;
        }
        console.log(111, wishRelationship);
        console.log(222, product);
        
        res.json({"product": product, "liking": liking});
    })
    .catch((error)=>{
        console.log(555, error);
        
        next(error);
    })
}

// REFRACTORIZAR ESTO????? QUIERO QUE ME RETORNE EL PRODUCTO NO LA RELACION USER-PRODUCT ASI CON UN SUBJECT PUEDO AÑADIRLE ESE +1 DEL LIKE???
module.exports.likeProduct = (req, res, next) =>{         
    WishProduct.findOne({ $and: [ { user: req.params.userId}, { product: req.params.productId}] })
    .then((wishProduct)=>{
        if (wishProduct) {   
            throw createError(409, 'You already like this product');
        } else{
            Promise.all([
                new WishProduct({user: req.params.userId, product: req.params.productId}).save(),
                Product.findByIdAndUpdate(req.params.productId, {$inc: {numberOfLikes: 1}}, { runValidators: true, new: true }).populate('owner')
            ])
            .then(([wishProduct, product])=>{
                console.log(333, wishProduct);
                console.log(444, product);
                
                res.json(product);
            })
            .catch((error)=>{
                next(error);
            })
        }
    })
    .catch((error)=>{        
        next(error);
    })
    
}

// module.exports.isLiking = (req, res, next) =>{    
//     WishProduct.findOne({ $and: [ { user: req.params.userId}, { product: req.params.productId}] })
//     .then((wishRelation)=>{   
//         if (wishRelation) {
//             res.status(201).json(true);
//         } else{
//             res.status(201).json(false);
//         }
//     })
//     .catch((error)=>{
//         next(error);
//     })
// }


module.exports.unlikeProduct = (req, res, next) =>{      
    Promise.all([
        Product.findByIdAndUpdate(req.params.productId, {$inc: {numberOfLikes: -1}}, { runValidators: true, new: true }).populate('owner'),
        WishProduct.findOneAndDelete({ $and: [ { user: req.params.userId}, { product: req.params.productId}] })
    ])
    .then(([product, wishProduct])=>{
        res.json(product);
    })
    .catch((error)=>{ // EL CATCH ESTA COMPARTIDO EN LOS PROMISE.ALL???
        next(error);
    })
}

module.exports.deleteProductByUser = (req, res, next) =>{    
    Product.findByIdAndDelete(req.params.productId)
    .then(()=>{        
        res.status(204).json()
    })
    .catch((error)=>{
        next(error);
    })
}
