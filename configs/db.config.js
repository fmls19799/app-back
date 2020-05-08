const mongoose = require('mongoose');

const MONGO_URI_START = process.env.MONGO_URI_START;
const MONGO_URI_END = process.env.MONGO_URI_END;
const USER_FRAN = process.env.USER_FRAN;
const PASSWORD_FRAN = process.env.PASSWORD_FRAN;
const connectionStrign = `${MONGO_URI_START}${USER_FRAN}:${PASSWORD_FRAN}${MONGO_URI_END}`;

mongoose.connect(connectionStrign, { useNewUrlParser: true , useUnifiedTopology: true})
.then((data)=>console.log(`Connected to db MLAB - ${data.connection.name}`))
.catch(error => console.log(`An error ocurred ${error}`));
