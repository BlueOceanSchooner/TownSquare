const connection = require('../../db/connection.js');


const getPostsByGroupId = (req, res) => {
  const group_id = req.params.group_id;
  const sql = `
    SELECT p.post_id, p.group_id, p.created_at, p.title, p.body,
      u.user_id, u.first_name, u.last_name, u.email
    FROM posts p
    LEFT JOIN users u
    ON p.author = u.user_id
    WHERE p.group_id = ?
  `;
  connection.query(sql, [group_id], (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    const rows = results.map((row) => {
      return {
        post_id: row.post_id,
        group_id: row.group_id,
        created_at: row.created_at,
        body: row.body,
        description: row.description,
        author: {
          user_id: row.user_id,
          first_name: row.first_name,
          last_name: row.last_name,
          email: row.email
        }
      }
    });
    res.json(rows);
  });
};

const addPost = (req, res) => {
  const group_id = req.params.group_id;
  const title = req.body.title;
  const body = req.body.body;
  const user_id = req.body.user_id;
  const data = {
    group_id: group_id,
    author: user_id,
    title: title,
    body: body
  }
  const sql = `INSERT INTO posts SET ?`;
  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    return res.json(results);
  });
}

module.exports = {
  getPostsByGroupId,
  addPost
};
