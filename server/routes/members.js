const connection = require('../../db/connection.js');

const getGroupMembers = (req, res) => {
  const group_id = req.params.group_id;
  const sql = `
    SELECT u.user_id, u.first_name, u.last_name
    FROM users u
    LEFT JOIN members m
    ON u.user_id = m.user_id
    WHERE m.group_id = ?
  `;
  connection.query(sql, [group_id], (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    return res.json(results);
  })
}

const getUserGroups = (req, res) => {
  const user_id = req.params.user_id;
  const sql = `
    SELECT g.group_id, g.group_name, g.description, g.category
    FROM groups_table g
    RIGHT JOIN members m
    ON g.group_id = m.group_id
    WHERE m.user_id = ?
  `;
  connection.query(sql, [user_id], (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    return res.json(results);
  });
};

const addUserToGroup = (req, res) => {
  const data = {
    group_id: req.params.group_id,
    user_id: req.params.user_id
  }
  if (!req.body.hasOwnProperty('status')) {
    return res.json({
      errors: ['please specify status as 1 or 0']
    });
  }
  const value = req.body.status == '1' ? 1 : 0;
  if (value == 1) {
    connection.query('INSERT INTO members SET ?', data, (err, results) => {
      if (err) {
        return res.json({
          error: err
        });
      }
      return res.json({
        success: true
      });
    });
  } else {
    connection.query('DELETE FROM members WHERE members.user_id = ? AND members.group_id = ?', [data.user_id, data.group_id], (err, results) => {
      if (err) {
        return res.json({
          errors: [err]
        })
      }
      return res.json({
        success: true
      });
    });
  }

}

module.exports = {
  getGroupMembers,
  getUserGroups,
  addUserToGroup
};
