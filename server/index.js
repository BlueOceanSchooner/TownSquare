const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const connection = require('../db/connection.js')
const cookieParser = require('cookie-parser');
const app = express();
const router = require('./routes/index.js');
const auth = require('./auth/auth.js');
const passport = require('passport');
const morgan = require('morgan');
const path = require('path');

app.use(morgan('dev'))
app.use(express.json());
app.set('json spaces', 2);
app.use(express.static('client/dist'));

app.use('/api', router);
app.use(cookieParser())
var options = {
  connectionLimit: 10,
  host: 'localhost',
  port: 3306,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};
var sessionStore = new MySQLStore({}, connection);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.post('/signup', auth.signup);
app.post('/login', auth.login);

const file = path.join(__dirname, '../client/dist/index.html');
app.get('*', (req, res) => {
  res.sendFile(file);
});

app.listen(3000, () => {
  console.log(`listening on port 3000`);
});