const connection = require('../../db/connection.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }, function (username, password, done) {
    const sql = `SELECT password FROM users WHERE email = ?`
    connection.query(sql, username, (err, user) => {
      if (err) {
        done(err)
      }
      if (!user) {
        console.log('Username not exist!');

        return done(null, false, {message: 'Username not exist!'});
      }
      if (user.password != password) {
        console.log('Wrong password');

        return done(null, false, {message: 'Wrong password'});
      }

      return done(null, user);
    });

}));

passport.authenticateMiddleware = function() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
};


module.exports = passport;