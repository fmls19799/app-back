
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
        // km: Math.floor(Math.random() * 20000) + 1,
        owner: randomUser(),
        description: 'dasdasdsaaslmmkdaslmkdsadasklkdas',
        address: 'Goya 71',
        rentOrBuy: randomRentOrBuy(),
        type: randomType(),
        photos : faker.image.imageUrl()
    }
}

function randomRentOrBuy(){
    let items = ['Rent', 'Sell', 'Exchange', 'Gift'];
    return items[Math.floor(Math.random()*items.length)];
}

function randomType(){
    let items = ['Cars', 'Real state', 'Gaming', 'Cycling', 'Sports', 'Phones', 'Clothing', 'Boats'];
    return items[Math.floor(Math.random()*items.length)];
}
function randomUser(){
    let items = ['5c66f13ddb3c44019b7cffea', '5c66f152db3c44019b7cffeb'];
    return items[Math.floor(Math.random()*items.length)];
}

var bulkData = [];

populate();
function populate(){
    for (let index = 0; index < 10; index++) {
        bulkData.push(generateOne())
    }
}
function populate2(){
    for (let index = 0; index < 10; index++) {
        bulkData.push(generateTwo())
    }
}


Product.insertMany(bulkData)
.then(bulkData => {
    console.error(`Seeded ${bulkData.length} PRODUCTS properly: ${bulkData}`);
    mongoose.connection.close();
})
.catch(error => {
    console.error('Seeding error:', error);
    mongoose.connection.close();
});
