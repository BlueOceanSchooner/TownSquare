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
  const user_id = req.params.id;
  connection.query('SELECT * FROM users WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    return res.json(results);
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
