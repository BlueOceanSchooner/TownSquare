const connection = require('../../db/connection.js');
const bcrypt = require('bcrypt');

const signup = (req, res) => {
  console.log(req.body)
  // let {first_name, last_name, email, password} = req.body;
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  connection.query('SELECT 1 FROM users WHERE email = ?', req.body.email, (err, results) => {
    if (err) {
      console.log(err)
      return res.json({
        error: err
      });
    }
    if (results.length === 0) {
      // var user = {first_name, last_name, email, password};
      connection.query('INSERT INTO users SET ?', req.body, (err, results) => {
        if (err) {
          console.log(err)
          return res.json({
            error: err
          });
        }
      });
      console.log(results)
      return res.json(results);
    } else {
      if (results[0]['1'] === 1) {
        res.json({ msg: 'used' })
      } else {
        res.redirect('/');
      }
    }
  });
};
const login = (req, res) => {
  console.log(req.body)
};

module.exports = {
  signup,
  login
};