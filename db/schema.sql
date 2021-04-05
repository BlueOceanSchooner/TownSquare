DROP TABLE IF EXISTS users;
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  created_at TIMESTAMP,
  country_code INT
);

DROP TABLE IF EXISTS groups_table;
CREATE TABLE groups_table (
  group_id INT AUTO_INCREMENT PRIMARY KEY,
  group_name VARCHAR(255),
  description TEXT,
  category ENUM ('outdoors', 'music', 'cooking', 'animals', 'hobbies', 'religious'),
  owner_id INT REFERENCES users(user_id)
);

DROP TABLE IF EXISTS events;
CREATE TABLE events (
  event_id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT REFERENCES groups_table(group_id),
  title VARCHAR(255),
  description TEXT,
  address_1 VARCHAR(255),
  address_2 VARCHAR(255),
  city VARCHAR(255),
  state CHAR(2),
  zipcode CHAR(5),
  event_date DATETIME
);

DROP TABLE IF EXISTS members;
CREATE TABLE members (
  group_id INT REFERENCES groups_table(group_id),
  user_id INT REFERENCES users(user_id),
  PRIMARY KEY(group_id, user_id)
);

DROP TABLE IF EXISTS attendees;
CREATE TABLE attendees (
  event_id INT,
  user_id INT REFERENCES users(user_id),
  attending INT DEFAULT 0
);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  post_id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT REFERENCES groups_table(group_id),
  author INT REFERENCES users(user_id),
  created_at TIMESTAMP,
  title VARCHAR(255),
  body TEXT
);

DROP TABLE IF EXISTS dms;
CREATE TABLE dms (
  dm_id INT AUTO_INCREMENT PRIMARY KEY,
  sender INT REFERENCES users(user_id),
  receiver INT REFERENCES users(user_id),
  sent TIMESTAMP,
  message VARCHAR(255)
);

DROP TABLE IF EXISTS forum;
CREATE TABLE forum (
  forum_post_id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT REFERENCES groups_table(group_id),
  user_id INT REFERENCES users(user_id),
  posted TIMESTAMP,
  message VARCHAR(255)
);
