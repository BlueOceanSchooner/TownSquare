const connection = require('../../db/connection.js');
const bcrypt = require('bcrypt');

const signup = (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  connection.query('SELECT password,oauth_provider FROM users WHERE email = ?', req.body.email, (err, results) => {
    if (err) {
      console.log(err)
      return res.json({
        error: err
      });
    }
    if (results.length === 0) {
      req.body.oauth_provider = 'local';
      connection.query('INSERT INTO users SET ?', req.body, (err, results) => {
        if (err) {
          console.log(err)
          return res.json({
            error: err
          });
        }
        res.json({ msg: 'success' })
      });
    } else {
      if (results[0].oauth_provider === 'google') {
        res.json({ msg: 'google' })
      } else {
        res.json({ msg: 'used' })
      }
    }
  });
};
const login = (req, res) => {
  if (req.body.keepLogin) {
    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 365;
  } else {
    req.session.cookie.expires = false;
  }
  res.json({
    msg: 'success'
  })
};
const googleLogin = (req, res) => {
  res.redirect('/')
  // const resUser = {
  //   user_id: req.user.user_id,
  //   first_name: req.user.first_name,
  //   last_name: req.user.last_name,
  //   email: req.user.email,
  //   oauth_provider: req.user.oauth_provider,
  // }
  // res.json({
  //   user: resUser,
  //   msg: 'success'
  // })
};

module.exports = {
  signup,
  login,
  googleLogin
};