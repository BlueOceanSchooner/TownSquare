const connection = require('../../db/connection.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const customFields = {
  usernameField: 'email',
  passwordField: 'password'
};

const verifyCallback = (username, password, done) => {
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    username,
    (err, users) => {
      if (err) {
        return done(err);
      }
      if (users.length === 0) {
        return done(null, false, {message: 'No such user'});
      }
      var user = users[0];

      bcrypt.compare(password, user.password, function(err, isValid) {
        if (isValid) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    }
  )
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
})

passport.deserializeUser((user_id, done) => {
  connection.query(
    'SELECT * FROM users WHERE user_id = ?',
    user_id,
    (err, user) => {
      if (err) {
        return done(err);
      }
      return done(null, user);
    });
})

module.exports = passport;