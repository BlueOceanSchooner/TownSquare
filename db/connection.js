require('dotenv').config();
const mysql = require('mysql');

if (!process.env.hasOwnProperty('DB_NAME')) {
  throw Error('.env file missing DB_NAME');
}

if (!process.env.hasOwnProperty('DB_USER')) {
  throw Error('.env file missing DB_USER');
}

if (!process.env.hasOwnProperty('DB_PASS')) {
  throw Error('.env fiel missing DB_PASS');
}

const connection = mysql.createConnection({
  host: 'localhost',
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

module.exports = connection;
