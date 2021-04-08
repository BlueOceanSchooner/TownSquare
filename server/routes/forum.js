const connection = require('../../db/connection.js');

const getForumPostsByGroupId = (req, res) => {
  const group_id = req.params.group_id;
  const sql = `
    SELECT f.forum_post_id, f.group_id, f.user_id, f.posted, f.message,
      u.first_name, u.last_name, u.email
    FROM forum f
    LEFT JOIN users u ON f.user_id = u.user_id
    WHERE f.group_id = ?
    ORDER BY f.posted
  `;
  const sql2 = `
    SELECT fr.reply_id, fr.group_id, fr.forum_post_id, fr.user_id, fr.posted, fr.message,
      u.first_name, u.last_name, u.email
    FROM forum_replies fr
    LEFT JOIN users u ON fr.user_id = u.user_id
    WHERE fr.group_id = ?
    ORDER BY fr.posted
  `;
  connection.query(sql, [group_id], (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    const mainPosts = {};
    results.forEach((row) => {
      const post_id = row.forum_post_id;
      mainPosts[post_id] = {
        parent: {
          forum_post_id: post_id,
          group_id: row.group_id,
          posted: row.posted,
          message: row.message,
          author: {
            user_id: row.user_id,
            first_name: row.first_name,
            last_name: row.last_name,
            email: row.email
          }
        },
        children: []
      };
    });
    connection.query(sql2, [group_id], (err, nested_results) => {
      if (err) {
        return res.json({
          error: err
        });
      }
      nested_results.forEach((row) => {
        const parent_id = row.forum_post_id;
        mainPosts[parent_id].children.push({
          reply_id: row.reply_id,
          posted: row.posted,
          message: row.message,
          author: {
            user_id: row.user_id,
            first_name: row.first_name,
            last_name: row.last_name,
            email: row.email
          }
        });
      });
      const posts = [];
      for (let post in mainPosts) {
        posts.push(mainPosts[post]);
      }
      return res.json(posts);
    });
  });
}

const postOnForum = (req, res) => {
  const group_id = req.params.group_id;
  const user_id = req.body.user_id;
  const message = req.body.message;
  const sql = `INSERT INTO forum SET ?`;
  const data = {
    group_id: group_id,
    user_id: user_id,
    message: message
  }
  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    const sql = `
      SELECT f.forum_post_id, f.group_id, f.user_id, f.posted, f.message,
        u.first_name, u.last_name, u.email
      FROM forum f
      LEFT JOIN users u ON f.user_id = u.user_id
      WHERE f.forum_post_id = ?
    `;
    const forumPostId = results.insertId;
    connection.query(sql, [forumPostId], (err, results) => {
      if (err) {
        return res.json({
          errors: [err]
        });
      }
      const row = results[0];
      const data = {
        parent: {
          forum_post_id: row.forum_post_id,
          group_id: row.group_id,
          posted: row.posted,
          message: row.message,
          author: {
            user_id: row.user_id,
            first_name: row.first_name,
            last_name: row.last_name,
            email: row.email
          }
        },
        children: []
      };
      return res.json(data);
    })
  });
}

const replyOnForum = (req, res) => {
  const group_id = req.params.group_id;
  const forum_post_id = req.body.forum_post_id;
  const user_id = req.body.user_id;
  const message = req.body.message;
  const sql = `INSERT INTO forum_replies SET ?`;
  const data = {
    group_id,
    forum_post_id,
    user_id,
    message
  };
  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    const insertId = results.insertId;
    const sql2 = `
      SELECT fr.reply_id, fr.group_id, fr.forum_post_id, fr.user_id, fr.posted, fr.message,
        u.first_name, u.last_name, u.email
      FROM forum_replies fr
      LEFT JOIN users u ON fr.user_id = u.user_id
      WHERE fr.reply_id = ?
    `;
    connection.query(sql2, [insertId], (err, data) => {
      if (err) {
        return res.json({
          errors: [err]
        });
      }
      const row = data[0];
      const reply = {
        reply_id: row.reply_id,
        posted: row.posted,
        message: row.message,
        author: {
          user_id: row.user_id,
          first_name: row.first_name,
          last_name: row.last_name,
          email: row.email
        }
      }
      return res.json(reply);
    });
  });
}

module.exports = {
  getForumPostsByGroupId,
  postOnForum,
  replyOnForum
};
