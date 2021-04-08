const connection = require('../../db/connection.js');
const axios = require('axios');

const getAllGroups = (req, res) => {
  connection.query('SELECT g.group_id, g.image_url, g.group_name, g.description, g.category, g.owner_id, u.first_name, u.last_name, u.email FROM groups_table g LEFT JOIN users u ON g.owner_id = u.user_id', (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    results = results.map((row) => {
      return {
        group_id: row.group_id,
        image_url: row.image_url,
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
  });
};

const findGroupByName = (req, res) => {
  if (!req.query || !req.query.name) {
    return res.json({
      errors: ['please specify a partial or complete name to search for']
    });
  }
  const partialMatch = `%${req.query.name}%`;
  const exactMatch = req.query.name;
  const isExactMatch = req.query.exact && req.query.exact === 'true';
  let sql, term;
  const sqlBase = `
    SELECT g.group_id, g.image_url, g.group_name, g.description, g.category, g.owner_id,
      u.first_name, u.last_name, u.email
    FROM groups_table g
    LEFT JOIN users u ON g.owner_id = u.user_id
  `;
  if (isExactMatch) {
    sql = sqlBase + ' WHERE g.group_name = ?';
    term = exactMatch;
  } else {
    sql = sqlBase + ' WHERE g.group_name LIKE ?';
    term = partialMatch;
  }
  connection.query(sql, term, (err, results) => {
    if (err) {
      return res.json({
        errors: [err]
      });
    }
    results = results.map((row) => {
      return {
        group_id: row.group_id,
        image_url: row.image_url,
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
  });
}

const getGroupsByCategory = (req, res) => {
  const category = req.params.category;
  const sql = `
    SELECT g.group_id, g.image_url, g.group_name, g.description, g.category, g.owner_id,
      u.first_name, u.last_name, u.email
    FROM groups_table g
    LEFT JOIN users u ON g.owner_id = u.user_id
    WHERE category = ?
  `;
  connection.query(sql, [category], (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    results = results.map((row) => {
      return {
        group_id: row.group_id,
        image_url: row.image_url,
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
  });
}

const getGroupById = (req, res) => {
  const group_id = req.params.group_id;
  connection.query('SELECT g.group_id, g.image_url, g.group_name, g.description, g.category, g.owner_id, u.first_name, u.last_name, u.email FROM groups_table g LEFT JOIN users u ON g.owner_id = u.user_id WHERE g.group_id = ?', [group_id], (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    if (results.length === 1) {
      const row = results[0];
      return res.json({
        group_id: row.group_id,
        image_url: row.image_url,
        group_name: row.group_name,
        description: row.description,
        category: row.category,
        owner: {
          user_id: row.owner_id,
          first_name: row.first_name,
          last_name: row.last_name,
          email: row.email
        }
      });
    }
    return res.json({
      error: `no group found with id ${user_id}`
    });
  });
};

const getGroupsByOwnerId = (req, res) => {
  const owner_id = req.params.user_id;
  connection.query('SELECT g.group_id, g.image_url, g.group_name, g.description, g.category, g.owner_id, u.first_name, u.last_name, u.email FROM groups_table g LEFT JOIN users u ON g.owner_id = u.user_id WHERE g.owner_id = ?', [owner_id], (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    const rows = results.map((row) => {
      return {
        group_id: row.group_id,
        image_url: row.image_url,
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
    return res.json(rows);
  });
}

const getGroupsByMemberId = (req, res) => {
  const member_id = req.params.user_id;
  const sql = `
    SELECT
      g.group_id, g.image_url, g.group_name, g.description, g.category, g.owner_id,
      u.first_name, u.last_name, u.email
    FROM
      groups_table g
    LEFT JOIN users u ON g.owner_id = u.user_id
    RIGHT JOIN members m ON g.group_id = m.group_id
    WHERE m.user_id = ?
  `;
  connection.query(sql, [member_id], (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    const rows = results.map((row) => {
      return {
        group_id: row.group_id,
        image_url: row.image_url,
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
    return res.json(rows);
  });
}

const addGroup = (req, res) => {
  const errors = [];
  const validCategories = ['outdoors', 'music', 'cooking', 'animals', 'hobbies', 'religious'];
  const data = req.body;
  if (!data.hasOwnProperty('group_name')) {
    errors.push('group_name is required field');
  }
  if (!data.hasOwnProperty('description')) {
    errors.push('description is required field');
  }
  if (!data.hasOwnProperty('category')) {
    errors.push('category is required field');
  } else if (!validCategories.includes(data.category)) {
    errors.push(`"${data.category}" is not a valid category`);
  }
  if (!data.hasOwnProperty('owner_id')) {
    errors.push('owner_id is required field');
  }
  if (!data.hasOwnProperty('zipcode')) {
    errors.push('zipcode is required field');
  }
  if (errors.length !== 0) {
    return res.json({
      errors: errors
    });
  }

  const defaultImages = {
    outdoors: '/assets/images/default-outdoors.jpg',
    music: '/assets/images/default-music.jpb',
    cooking: '/assets/images/default-cooking.jpg',
    animals: '/assets/images/default-animals.jpg',
    hobbies: '/assets/images/default-hobbies.jpg',
    religious: '/assets/images/default-religious.jpg'
  };

  if (!process.env.hasOwnProperty('P_STACK_API_KEY')) {
    return res.send({
      errors: ['no Position Stack API key loaded! cannot locate coordinates without location service']
    });
  }

  data.image_url = data.image_url ? data.image_url : defaultImages[data.category];

  const P_STACK_API_KEY = process.env.P_STACK_API_KEY;
  const ZIPCODE = data.zipcode;

  const params = {
    access_key: P_STACK_API_KEY,
    query: `zipcode ${ZIPCODE}`
  };

  axios.get('http://api.positionstack.com/v1/forward', {params})
    .then(response => {
      const results = response.data.data;
      if (results.length === 0) {
        return res.json({
          error: 'no location found for zipcode given'
        });
      }
      const latitude = results[0].latitude;
      const longitude = results[0].longitude;
      console.log(latitude, longitude)
      const sql = `INSERT INTO groups_table SET location = ST_GeomFromText('POINT(? ?)', 4326), ?`;

      connection.query(sql, [latitude, longitude, data], (err, results) => {
        if (err) {
          return res.json({
            errors: [err]
          });
        }
        const group_id = results.insertId;
        connection.query('SELECT g.group_id, g.image_url, g.group_name, g.description, g.category, g.owner_id, u.first_name, u.last_name, u.email FROM groups_table g LEFT JOIN users u ON g.owner_id = u.user_id WHERE g.group_id = ?', [group_id], (err, results) => {
          if (err) {
            return res.json({
              error: err
            });
          }
          if (results.length === 1) {
            const row = results[0];
            return res.json({
              group_id: row.group_id,
              image_url: row.image_url,
              group_name: row.group_name,
              description: row.description,
              category: row.category,
              owner: {
                user_id: row.owner_id,
                first_name: row.first_name,
                last_name: row.last_name,
                email: row.email
              }
            });
          }
          return res.json({
            error: `no group found with id ${user_id}`
          });
        });
      });
    })
    .catch(error => {
      return res.json({
        errors: [error]
      });
    });
}

module.exports = {
  getAllGroups,
  findGroupByName,
  getGroupById,
  getGroupsByOwnerId,
  getGroupsByMemberId,
  getGroupsByCategory,
  addGroup
};
