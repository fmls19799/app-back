const mongoose = require('mongoose');
const MONGO_URI_START= process.env.MONGO_URI_START;
const MONGO_URI_END= process.env.MONGO_URI_END;

// USER CHOSEN TO CONNECT TO MLAB => 
const USER=  process.env.USER_MLAB_FRAN;
const USER_MLAB_PASSWORD= process.env.USER_MLAB_PASSWORD;

mongoose.connect(`${MONGO_URI_START}${USER}:${USER_MLAB_PASSWORD}${MONGO_URI_END}`, { useNewUrlParser: true })
.then((data)=>console.log(`Connected to db MLAB - ${data.connection.name}`))
.catch(error => console.log(`An error ocurred ${error}`));
