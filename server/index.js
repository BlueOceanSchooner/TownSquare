const express = require('express');
const expressSession = require('express-session');
const app = express();
const router = require('./routes/index.js');
const auth = require('./routes/auth.js');
const passport = require('./auth/passport.js');
const morgan = require('morgan');
app.use(morgan('dev'))
app.use(express.json());
app.set('json spaces', 2);
app.use(express.static('client/dist'));
app.use(expressSession({
  key: 'user_sid',
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 10800000,
    httpOnly: false
  }
}));
app.use('/api', router);

app.post('/signup', passport.authenticate('local'), auth.signup);
app.post('/login', passport.authenticate('local'), auth.login);

app.listen(3000, () => {
  console.log(`listening on port 3000`);
});