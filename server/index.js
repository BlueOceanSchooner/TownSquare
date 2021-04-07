const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const router = require('./routes/index.js');
const auth = require('./routes/auth.js');
const passport = require('passport');
const morgan = require('morgan');
const path = require('path');

app.use(morgan('dev'))
app.use(express.json());
app.set('json spaces', 2);
app.use(express.static('client/dist'));

app.use('/api', router);
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 10800000,
    httpOnly: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.post('/signup', (req, res) => {
  console.log(req.body)
})

const file = path.join(__dirname, '../client/dist/index.html');
app.get('*', (req, res) => {
  res.sendFile(file);
});

app.listen(3000, () => {
  console.log(`listening on port 3000`);
});