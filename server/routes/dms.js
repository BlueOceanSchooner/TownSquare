const connection = require('../../db/connection.js');

const getAllDms = (req, res) => {
  const sql = `
    SELECT d.dm_id, d.sender, d.receiver, d.sent, d.message,
      us.user_id as sender_id, us.first_name as sender_first_name, us.last_name as sender_last_name,
      ur.user_id as receiver_id, ur.first_name as receiver_first_name, ur.last_name as receiver_last_name
    FROM dms d
      INNER JOIN users us ON d.sender = us.user_id
      INNER JOIN users ur ON d.receiver = ur.user_id
    ORDER BY d.sent ASC
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    const rows = results.map((row) => {
      return {
        dm_id: row.dm_id,
        timestamp: row.sent,
        message: row.message,
        sender: {
          user_id: row.sender_id,
          first_name: row.sender_first_name,
          last_name: row.sender_last_name
        },
        receiver: {
          user_id: row.receiver_id,
          first_name: row.receiver_first_name,
          last_name: row.receiver_last_name
        }
      };
    });
    res.json(rows);
  });
}

const getConversations = (req, res) => {
  const user_id = req.params.user_id;
  const sql = `
    SELECT d.dm_id, d.sender, d.receiver, d.sent, d.message,
      us.user_id as sender_id, us.first_name as sender_first_name, us.last_name as sender_last_name,
      ur.user_id as receiver_id, ur.first_name as receiver_first_name, ur.last_name as receiver_last_name
    FROM dms d
      INNER JOIN users us ON d.sender = us.user_id
      INNER JOIN users ur ON d.receiver = ur.user_id
    WHERE sender = ? OR receiver = ?
    ORDER BY d.sent ASC
  `;
  connection.query(sql, [user_id, user_id], (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    const rows = results.map((row) => {
      return {
        dm_id: row.dm_id,
        timestamp: row.sent,
        message: row.message,
        sender: {
          user_id: row.sender_id,
          first_name: row.sender_first_name,
          last_name: row.sender_last_name
        },
        receiver: {
          user_id: row.receiver_id,
          first_name: row.receiver_first_name,
          last_name: row.receiver_last_name
        }
      };
    });
    const conversations = {};
    rows.forEach((row) => {
      var ID = row.receiver.user_id === Number(user_id) ? row.sender.user_id : row.receiver.user_id;
      if (!conversations.hasOwnProperty(ID)) {
        conversations[ID] = [];
      }
      conversations[ID].push(row);
    });
    res.json(conversations);
  });
}


const addDm = (req, res) => {
  const sender = req.body.sender_id;
  const receiver = req.body.receiver_id;
  const message = req.body.message;
  const data = {
    sender,
    receiver,
    message
  };
  const sql = `INSERT INTO dms SET ?`;
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
  getAllDms,
  getConversations,
  addDm
};
