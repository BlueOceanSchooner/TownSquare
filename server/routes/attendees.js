const connection = require('../../db/connection.js');

const getEventAttendees = (req, res) => {
  const event_id = req.params.event_id;
  const sql = `
    SELECT
      u.user_id, u.first_name, u.last_name, u.email,
      a.attending
    FROM users u
    LEFT JOIN attendees a
    ON u.user_id = a.user_id
    WHERE a.event_id = ?
  `;
  connection.query(sql, [event_id], (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    return res.json(results);
  });
};

const getUserEvents = (req, res) => {
  const user_id = req.params.user_id;
  const sql = `
    SELECT
    e.event_id, e.group_id, e.title, e.description, e.address_1, e.address_2, e.city, e.state, e.zipcode, e.event_date,
    a.attending,
    g.group_id, g.group_name, g.description, g.category, ST_Latitude(e.location) AS latitude, ST_Longitude(e.location) AS longitude
    FROM
      events e
    LEFT JOIN
      attendees a ON e.event_id = a.event_id
    LEFT JOIN
      groups_table g ON g.group_id = e.group_id
    WHERE a.user_id = ?
  `;
  connection.query(sql, [user_id], (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    const rows = results.map((row) => {
      return {
        event_id: row.event_id,
        title: row.title,
        description: row.description,
        address_1: row.address_1,
        address_2: row.address_2,
        city: row.city,
        zipcode: row.zipcode,
        time: row.event_date,
        attending: row.attending,
        coords: {
          lat: row.latitude,
          long: row.longitude
        },
        group: {
          group_id: row.group_id,
          group_name: row.group_name,
          category: row.category
        }
      }
    });
    return res.json(rows);
  });
};

const doRsvp = (req, res) => {
  const event_id = req.params.event_id;
  const user_id = req.body.user_id;
  const status = Number(req.body.attending) === 1 ? 1 : 0;
  sql = `INSERT INTO attendees SET ?`;
  const data = {
    event_id: event_id,
    user_id: user_id,
    attending: status
  }
  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    return res.json(results);
  });
};

module.exports = {
  getEventAttendees,
  getUserEvents,
  doRsvp
};
