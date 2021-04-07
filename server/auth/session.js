const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const connection = require('../../db/connection.js')

var sessionStore = new MySQLStore({}, connection);
var sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
};

module.exports = sessionOptions;