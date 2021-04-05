const connection = require('../../db/connection.js');

const getAllUsers = (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    return res.json(results);
  })
}

const getUserById = (req, res) => {
  const user_id = req.params.user_id;
  connection.query('SELECT * FROM users WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    if (results.length === 0) {
      return res.json({
        error: `no user found with id ${user_id}`
      });
    }
    return res.json(results[0]);
  });
};

const addUser = (req, res) => {
  const data = req.body;
  console.log(data);
  connection.query('INSERT INTO users SET ?', data, (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    return res.json(results);
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser
};
