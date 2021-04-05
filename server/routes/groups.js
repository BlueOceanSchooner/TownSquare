const connection = require('../../db/connection.js');

const getAllGroups = (req, res) => {
  connection.query('SELECT g.group_name, g.description, g.category, g.owner_id, u.first_name, u.last_name, u.email FROM groups_table g LEFT JOIN users u ON g.owner_id = u.user_id', (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    results = results.map((row) => {
      return {
        group_name: row.group_name,
        description: row.description,
        category: row.category,
        owner: {
          user_id: row.owner_id,
          first_name: row.first_name,
          last_name: row.last_name,
          email: row.email
        }
      }
    });
    return res.json(results);
  })
}

const getGroupById = (req, res) => {
  const user_id = req.params.id;
  connection.query('SELECT * FROM groups_table WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    return res.json(results);
  });
};

const addGroup = (req, res) => {
  const data = req.body;
  console.log(data);
  connection.query('INSERT INTO groups_table SET ?', data, (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    return res.json(results);
  });
}

module.exports = {
  getAllGroups,
  getGroupById,
  addGroup
};
