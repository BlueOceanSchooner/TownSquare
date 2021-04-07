const connection = require('../../db/connection.js');

const getAllGroups = (req, res) => {
  connection.query('SELECT g.group_id, g.group_name, g.description, g.category, g.owner_id, u.first_name, u.last_name, u.email FROM groups_table g LEFT JOIN users u ON g.owner_id = u.user_id', (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    results = results.map((row) => {
      return {
        group_id: row.group_id,
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
    SELECT g.group_id, g.group_name, g.description, g.category, g.owner_id,
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
    SELECT g.group_id, g.group_name, g.description, g.category, g.owner_id,
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
  connection.query('SELECT g.group_id, g.group_name, g.description, g.category, g.owner_id, u.first_name, u.last_name, u.email FROM groups_table g LEFT JOIN users u ON g.owner_id = u.user_id WHERE g.group_id = ?', [group_id], (err, results) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    if (results.length === 1) {
      const row = results[0];
      return res.json({
        group_id: row.group_id,
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

const addGroup = (req, res) => {
  const errors = [];
  const data = req.body;
  if (!data.hasOwnProperty('group_name')) {
    errors.push('group_name is required field');
  }
  if (!data.hasOwnProperty('description')) {
    errors.push('description is required field');
  }
  if (!data.hasOwnProperty('category')) {
    errors.push('category is required field');
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
    outdoors: '',
    music: '',
    cooking: '',
    animals: '',
    hobbies: '',
    religious: ''
  };

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
  findGroupByName,
  getGroupById,
  getGroupsByCategory,
  addGroup
};
