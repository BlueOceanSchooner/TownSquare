const connection = require('../../db/connection.js');

const getAllEvents = (req, res) => {
  const sql = `
    SELECT e.event_id, e.group_id, e.title, e.description as event_description, e.address_1, e.address_2, e.city, e.state, e.zipcode, e.event_date, g.group_id, g.group_name, g.description as group_description, g.category
    FROM
      events e
    LEFT JOIN
      groups_table g
    ON e.group_id = g.group_id
    ORDER BY e.event_date
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    const rows = results.map((row) => {
      return {
        event_id: row.event_id,
        title: row.title,
        description: row.event_description,
        address_1: row.address_1,
        address_2: row.address_2,
        city: row.city,
        state: row.state,
        zipcode: row.zipcode,
        time: row.event_date,
        group: {
          group_id: row.group_id,
          group_name: row.group_name,
          description: row.group_description,
          category: row.category
        }
      }
    });
    return res.json(rows);
  })
}

const getEventsByGroup = (req, res) => {
  const group_id = req.params.id;
  const sql = `
    SELECT e.event_id, e.group_id, e.title, e.description as event_description, e.address_1, e.address_2, e.city, e.state, e.zipcode, e.event_date, g.group_id, g.group_name, g.description as group_description, g.category
    FROM
      events e
    LEFT JOIN
      groups_table g
    ON e.group_id = g.group_id
    WHERE e.group_id = ?
    ORDER BY e.event_date
  `;
  connection.query(sql, [group_id], (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    const rows = results.map((row) => {
      return {
        event_id: row.event_id,
        title: row.title,
        description: row.event_description,
        address_1: row.address_1,
        address_2: row.address_2,
        city: row.city,
        state: row.state,
        zipcode: row.zipcode,
        time: row.event_date,
        group: {
          group_id: row.group_id,
          group_name: row.group_name,
          description: row.group_description,
          category: row.category
        }
      }
    });
    return res.json(rows);
  })
};

const getEventById = (req, res) => {
  const event_id = req.params.id;
  const sql = `
    SELECT e.event_id, e.group_id, e.title, e.description as event_description, e.address_1, e.address_2, e.city, e.state, e.zipcode, e.event_date, g.group_id, g.group_name, g.description as group_description, g.category
    FROM
      events e
    LEFT JOIN
      groups_table g
    ON e.group_id = g.group_id
    WHERE e.event_id = ?
  `;
  connection.query(sql, [event_id], (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    if (results.length === 0) {
      return res.json({
        error: `no event found with id ${event_id}`
      });
    }
    const row = results[0];
    return res.json({
      event_id: row.event_id,
      title: row.title,
      description: row.event_description,
      address_1: row.address_1,
      address_2: row.address_2,
      city: row.city,
      state: row.state,
      zipcode: row.zipcode,
      time: row.event_date,
      group: {
        group_id: row.group_id,
        group_name: row.group_name,
        description: row.group_description,
        category: row.category
      }
    });
  });
};

const addEvent = (req, res) => {
  const data = req.body;
  console.log(data);
  connection.query('INSERT INTO events SET ?', data, (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    return res.json(results);
  });
}

module.exports = {
  getAllEvents,
  getEventsByGroup,
  getEventById,
  addEvent
};
