const passport = require('../auth/passport');

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/login');
  }
}