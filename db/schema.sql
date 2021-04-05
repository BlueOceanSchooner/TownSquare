CREATE TABLE `users` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `email` varchar(255),
  `created_at` timestamp,
  `country_code` int
);

CREATE TABLE `groups` (
  `group_id` int PRIMARY KEY AUTO_INCREMENT,
  `group_name` varchar(255),
  `description` text,
  `category` ENUM ('outdoors', 'music', 'cooking', 'animals', 'hobbies', 'religious'),
  `owner_id` int
);

CREATE TABLE `events` (
  `event_id` int PRIMARY KEY AUTO_INCREMENT,
  `group_id` int,
  `title` varchar(255),
  `description` text,
  `address_1` varchar(255),
  `address_2` varchar(255),
  `city` varchar(255),
  `state` char,
  `zipcode` char,
  `when` datetime
);

CREATE TABLE `members` (
  `group` int,
  `user` int
);

CREATE TABLE `attendees` (
  `event_id` int,
  `user_id` int,
  `attending` int DEFAULT 0
);

CREATE TABLE `posts` (
  `post_id` int PRIMARY KEY AUTO_INCREMENT,
  `group_id` int,
  `author` int,
  `created_at` timestamp,
  `title` varchar(255),
  `body` text
);

CREATE TABLE `dms` (
  `dm_id` int PRIMARY KEY AUTO_INCREMENT,
  `sender` int,
  `receiver` int,
  `sent` timestamp,
  `message` varchar(255)
);

CREATE TABLE `forum` (
  `forum_post_id` in PRIMARY KEY AUTO_INCREMENT,
  `group_id` int,
  `user_id` int,
  `posted` timestamp,
  `message` varchar(255)
);

ALTER TABLE `groups` ADD FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `events` ADD FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`);

ALTER TABLE `members` ADD FOREIGN KEY (`group`) REFERENCES `groups` (`group_id`);

ALTER TABLE `members` ADD FOREIGN KEY (`user`) REFERENCES `users` (`user_id`);

ALTER TABLE `attendees` ADD FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`);

ALTER TABLE `attendees` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`author`) REFERENCES `users` (`user_id`);

ALTER TABLE `dms` ADD FOREIGN KEY (`sender`) REFERENCES `users` (`user_id`);

ALTER TABLE `dms` ADD FOREIGN KEY (`receiver`) REFERENCES `users` (`user_id`);

ALTER TABLE `forum` ADD FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`);

ALTER TABLE `forum` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
