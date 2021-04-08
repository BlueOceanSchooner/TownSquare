const connection = require('../../db/connection.js');
const axios = require('axios');

const getAllEvents = (req, res) => {
  const sql = `
    SELECT e.event_id, e.group_id, e.title, e.description as event_description, e.address_1, e.address_2, e.city, e.state, e.zipcode, e.event_date, g.group_id, g.group_name, g.description as group_description, g.category, ST_Latitude(e.location) AS latitude, ST_Longitude(e.location) AS longitude
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
        coords: {
          lat: row.latitude,
          long: row.longitude
        },
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
  const group_id = req.params.group_id;
  const sql = `
    SELECT e.event_id, e.group_id, e.title, e.description as event_description, e.address_1, e.address_2, e.city, e.state, e.zipcode, e.event_date, g.group_id, g.group_name, g.description as group_description, g.category, ST_Latitude(e.location) AS latitude, ST_Longitude(e.location) AS longitude
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
        coords: {
          lat: row.latitude,
          long: row.longitude
        },
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

const getEventsByGroupCategory = (req, res) => {
  const category = req.params.category;
  const sql = `
    SELECT e.event_id, e.group_id, e.title, e.description as event_description, e.address_1, e.address_2, e.city, e.state, e.zipcode, e.event_date, g.group_id, g.group_name, g.description as group_description, g.category, ST_Latitude(e.location) AS latitude, ST_Longitude(e.location) AS longitude
    FROM
      events e
    LEFT JOIN
      groups_table g
    ON e.group_id = g.group_id
    WHERE g.category = ?
    ORDER BY e.event_date
  `;
  connection.query(sql, [category], (err, results) => {
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
        coords: {
          lat: row.latitude,
          long: row.longitude
        },
        group: {
          group_id: row.group_id,
          group_name: row.group_name,
          description: row.group_description,
          category: row.category
        }
      }
    });
    return res.json(rows);
  });
}


const getEventById = (req, res) => {
  const event_id = req.params.event_id;
  const sql = `
    SELECT e.event_id, e.group_id, e.title, e.description as event_description, e.address_1, e.address_2, e.city, e.state, e.zipcode, e.event_date, g.group_id, g.group_name, g.description as group_description, g.category, ST_Latitude(e.location) AS latitude, ST_Longitude(e.location) AS longitude
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
      coords: {
        lat: row.latitude,
        long: row.longitude
      },
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
  const errors = [];
  const data = req.body;
  if (!data.hasOwnProperty('group_id')) {
    errors.push('group_id is required');
  }
  if (!data.hasOwnProperty('title')) {
    errors.push('title is required');
  }
  if (!data.hasOwnProperty('address_1')) {
    errors.push('address_1 is required');
  }
  if (!data.hasOwnProperty('city')) {
    errors.push('city is required');
  }
  if (!data.hasOwnProperty('state')) {
    errors.push('state is required');
  }
  if (!data.hasOwnProperty('zipcode')) {
    errors.push('zipcode is required');
  }
  if (!data.hasOwnProperty('event_date')) {
    errors.push('event_date is required');
  }
  if (errors.length !== 0) {
    return res.json({
      errors: errors
    });
  }

  if (!process.env.hasOwnProperty('P_STACK_API_KEY')) {
    return res.send({
      errors: ['no Position Stack API key loaded! cannot locate coordinates without location service']
    });
  }

  const P_STACK_API_KEY = process.env.P_STACK_API_KEY;
  const ZIPCODE = data.zipcode;
  const ADDRESS = ([
    data.address_1,
    data.address_2,
    data.city,
    data.state,
    data.zipcode
  ]).join(' ');

  const params = {
    access_key: P_STACK_API_KEY,
    query: ADDRESS
  };

  axios.get('http://api.positionstack.com/v1/forward', {params})
    .then((response) => {
      const results = response.data.data;
      if (results.length === 0) {
        return res.json({
          errors: ['address not found in database; please consider moving your event']
        })
      }
      const latitude = results[0].latitude;
      const longitude = results[0].longitude;
      console.log(latitude, longitude);
      const sql = `INSERT INTO events SET location = ST_GeomFromText('POINT(? ?)', 4326), ?`;
      connection.query(sql, [latitude, longitude, data], (err, results) => {
        if (err) {
          return res.json({
            errors: [err]
          });
        }
        // success!
        // return the new event object
        const event_id = results.insertId;
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
      });
    })
    .catch((err) => {
      return res.json({
        errors: [err]
      });
    });

  // connection.query('INSERT INTO events SET ?', data, (err, results) => {
  //   if (err) {
  //     return res.json({
  //       error: err
  //     });
  //   }
  //   return res.json(results);
  // });
}

module.exports = {
  getAllEvents,
  getEventsByGroup,
  getEventsByGroupCategory,
  getEventById,
  addEvent
};
