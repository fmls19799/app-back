require('dotenv').config();
const session = require('express-session');

const sessionOpts = {
    secret: process.env.COOKIE_SECRET || 'SuperSecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    }
};

module.exports = (app) =>{
    app.use(session(sessionOpts));
};