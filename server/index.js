const express = require('express');
const session = require('express-session');
const sessionOptions = require('./auth/session.js');
const cookieParser = require('cookie-parser');
const app = express();
const router = require('./routes/index.js');
const passport = require('./auth/passport');
const auth = require('./auth/auth.js');
const isAuth = require('./auth/isAuth.js');
const morgan = require('morgan');
const path = require('path');
const calendar = require('./calendar/calendar.js');
const cors = require('cors');



app.use(morgan('dev'))
app.use(express.json());
app.set('json spaces', 2);
app.use(express.static('client/dist'));
app.use(cors());

// Session Middleware
app.use(cookieParser())
app.use(session(sessionOptions));

// Authentication Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);
app.post('/signup', auth.signup);
app.post('/login', passport.authenticate('local'), auth.login);
app.get("/google-login", passport.authenticate("google", {
  scope: ["profile", "email"]
}));
app.get("/google-login/redirect", passport.authenticate('google'), auth.googleLogin);
app.post('/calendar', passport.authenticate('google'), calendar.addEvent);

const file = path.join(__dirname, '../client/dist/index.html');
app.get('*', (req, res) => {
  res.sendFile(file);
});

app.listen(3000, () => {
  console.log(`listening on port 3000`);
});