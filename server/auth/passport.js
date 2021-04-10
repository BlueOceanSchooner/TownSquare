const connection = require('../../db/connection.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');

// /////////////////////////////////////////////////////
//             Local Strategy Configuration
// /////////////////////////////////////////////////////

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
      if (user.oauth_provider === 'google') {
        return done(null, false, {message: 'Login through google'});
      }
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

passport.use(new LocalStrategy(customFields, verifyCallback));

// /////////////////////////////////////////////////////
//            Google Strategy Configuration
// /////////////////////////////////////////////////////

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: "/google-login/redirect"
}

const googleCallback = (accessToken, refreshToken, profile, done) => {
  connection.query(
    `SELECT * FROM users WHERE email = ? AND oauth_provider = 'google'`, profile.emails[0].value,
    (err, users) => {
      if (err) {
        return done(err);
      }
      if (users.length === 0) {
        var user = {
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          email: profile.emails[0].value,
          oauth_provider: 'google',
          access_token: accessToken,
          refresh_token: refreshToken
        }
        connection.query('INSERT INTO users SET ?', user, (err, results) => {
          if (err) {
            return done(err);
          }
          return done(null, user, {message: 'New account created'});
        });
      }
      var user = users[0];
      user.access_token = accessToken;
      user.refresh_token = refreshToken;
      return done(null, user, {message: 'Logged in with google'});
    })
}
passport.use(new GoogleStrategy(googleConfig, googleCallback));

// /////////////////////////////////////////////////////
//           Serialize and Deserialze User
// /////////////////////////////////////////////////////

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