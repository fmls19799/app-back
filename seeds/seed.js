
const mongoose = require('mongoose');
// QUITAR ESTO Y PONERLO COMO SE DEBE, CON VARIABLES  Y MNIRARR OTROS EHEMPLOES???
mongoose.connect('mongodb://fran:Berna123@ds229909.mlab.com:29909/yourstuffeveryonestuff', { useNewUrlParser: true })
.then((data)=>console.log(`Connected to db MLAB - ${data.connection.name}`))
.catch(error => console.log(`An error ocurred ${error}`));

const Product = require('../models/product.model');
require('../configs/db.config');
const faker = require('faker');



function generateOne(){
    return {
        name: 'Coche 1',
        price: Math.floor(Math.random() * 20000) + 1,
        km: Math.floor(Math.random() * 20000) + 1,
        owner: '5c430f7c26a58d1e5ae6ea21',
        description: 'kmasmlmdkldsadasdasdsdasjnkdsandsjanjdasjnkdasnjkdasknjdsnjkdsnkjadnjks',
        address: 'Goya 71',
        photos : faker.image.imageUrl()
    }
}

var bulkData = [];

populate();
function populate(){
    for (let index = 0; index < 3; index++) {
        // console.log(index);
        bulkData.push(generateOne())
    }
}


Product.insertMany(bulkData)
.then(bulkData => {
    console.error(`Seeded ${bulkData.length} PRODUCTS properly`);
    mongoose.connection.close();
})
.catch(error => {
    console.error('Seeding error:', error);
    mongoose.connection.close();
});
