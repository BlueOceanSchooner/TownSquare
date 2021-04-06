const express = require('express');
const expressSession = require('express-session');
const app = express();
const router = require('./routes/index.js');
<<<<<<< HEAD
const auth = require('./routes/auth.js');
const passport = require('./auth/passport.js');
const morgan = require('morgan');
app.use(morgan('dev'))
=======
const path = require('path');

>>>>>>> master
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

<<<<<<< HEAD
app.post('/signup', passport.authenticate('local'), auth.signup);
app.post('/login', passport.authenticate('local'), auth.login);
=======
const file = path.join(__dirname, '../client/dist/index.html');
app.get('*', (req, res) => {
  res.sendFile(file);
});
>>>>>>> master

app.listen(3000, () => {
  console.log(`listening on port 3000`);
});