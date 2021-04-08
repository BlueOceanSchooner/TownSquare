-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: tsquare
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendees`
--

DROP TABLE IF EXISTS `attendees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendees` (
  `event_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `attending` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendees`
--

LOCK TABLES `attendees` WRITE;
/*!40000 ALTER TABLE `attendees` DISABLE KEYS */;
INSERT INTO `attendees` VALUES (1,1,1),(2,1,1),(3,1,1),(3,11,1),(3,12,1),(3,13,1),(3,14,1),(3,15,1),(1,11,1),(1,12,0),(1,13,1),(1,14,0),(1,15,1),(2,11,0),(2,12,1);
/*!40000 ALTER TABLE `attendees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dms`
--

DROP TABLE IF EXISTS `dms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dms` (
  `dm_id` int NOT NULL AUTO_INCREMENT,
  `sender` int DEFAULT NULL,
  `receiver` int DEFAULT NULL,
  `sent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` varchar(255) DEFAULT NULL,
  `wasRead` boolean DEFAULT '0',
  PRIMARY KEY (`dm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dms`
--

LOCK TABLES `dms` WRITE;
/*!40000 ALTER TABLE `dms` DISABLE KEYS */;
INSERT INTO `dms` VALUES (2,1,2,'2021-04-05 16:28:09','Hi',0),(3,2,1,'2021-04-05 16:28:30','Oh, hello there man',0),(4,1,2,'2021-04-05 16:28:42','May we have a conversation?',0),(5,2,1,'2021-04-05 16:28:55','How can one converse at a time like this?',0),(6,1,2,'2021-04-05 16:29:15','Like this: bing, bang, bing bang boom',0),(7,2,1,'2021-04-05 16:29:29','Your song spoke to my heart',0),(8,1,2,'2021-04-05 16:29:38','Okay',0),(9,1,3,'2021-04-05 16:39:35','Knock Knock',0),(10,3,1,'2021-04-05 16:39:47','Who dat?',0),(11,1,3,'2021-04-05 16:40:07','Oh, I\'m sorry, I thought you were someone else',0),(12,3,1,'2021-04-05 16:40:17','Oh, I\'m sorry, I thought you were someone else who?',0),(13,1,3,'2021-04-05 16:40:40','Never message me again or I will contact the authorities',0),(14,3,1,'2021-04-05 16:40:55','Okay',0);
/*!40000 ALTER TABLE `dms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `group_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `address_1` varchar(255) DEFAULT NULL,
  `address_2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` char(2) DEFAULT NULL,
  `zipcode` char(5) DEFAULT NULL,
  `event_date` datetime DEFAULT NULL,
  `location` point NOT NULL /*!80003 SRID 4326 */,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,1,'Uncaught Reference Error Themed Party','Please wear a costume and it will be a fun party. I am just so tired. But really it would be cool to see everyone in a costume','1400 Ranchland Drive','','Mayfield Heights','OH','44124','2021-05-08 12:00:00',0xE61000000101000000174850FC185E54C0A0DE8C9AAFC24440),(2,2,'Hikathon to Raise Awareness about Photosynthesis','The whole gang will be there - dont miss it!','8361 Canterbury Court','','Chagrin Falls','OH','44023','2021-05-08 12:00:00',0xE610000001010000007EE4D6A4DB5854C05AF5B9DA8AB74440),(3,3,'Zucchini Eating Contest','Be there or be square','87 West Street','','Chagrin Falls','OH','44022','2021-05-08 12:00:00',0xE61000000101000000B16EBC3B325954C0DE59BBED42B74440),(4,1,'Social Hack Night','You know the deal','44 North Main Street','','Chagrin Falls','OH','44022','2021-05-10 20:00:00',0xE6100000010100000093FE5E0A0F5954C0D862B7CF2AB74440),(5,1,'Sleep','If its not on the schedule then you probably wont do it','1420 Golden Gate Blvc','','Mayfield Heights','OH','44124','2021-05-14 22:30:00',0xE6100000010100000033A5F5B7045D54C0323D618907C24440),(6,1,'Underwater Whiteboarding','AKA Waterboarding','1385 Merry Oaks Trail','','Chagrin Falls','OH','44022','2021-05-28 21:15:00',0xE610000001010000007EE4D6A4DB5854C05AF5B9DA8AB74440);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum`
--

DROP TABLE IF EXISTS `forum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum` (
  `forum_post_id` int NOT NULL AUTO_INCREMENT,
  `group_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `posted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`forum_post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum`
--

LOCK TABLES `forum` WRITE;
/*!40000 ALTER TABLE `forum` DISABLE KEYS */;
INSERT INTO `forum` VALUES (1,1,1,'2021-04-05 17:02:18','What a dope forum to post on!'),(3,1,1,'2021-04-05 17:05:27','Syntax error? More like byntax error!');
/*!40000 ALTER TABLE `forum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_replies`
--

DROP TABLE IF EXISTS `forum_replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_replies` (
  `reply_id` int NOT NULL AUTO_INCREMENT,
  `group_id` int DEFAULT NULL,
  `forum_post_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `posted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`reply_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_replies`
--

LOCK TABLES `forum_replies` WRITE;
/*!40000 ALTER TABLE `forum_replies` DISABLE KEYS */;
INSERT INTO `forum_replies` VALUES (1,1,1,1,'2021-04-05 17:08:53','Syntax error? More like byntax error!'),(2,1,1,2,'2021-04-05 17:09:27','That joke was dumb! Also you replied to your own post.');
/*!40000 ALTER TABLE `forum_replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups_table`
--

DROP TABLE IF EXISTS `groups_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups_table` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) DEFAULT NULL,
  `description` text,
  `category` enum('outdoors','music','cooking','animals','hobbies','religious') DEFAULT NULL,
  `owner_id` int DEFAULT NULL,
  `zipcode` char(5) DEFAULT NULL,
  `location` point NOT NULL /*!80003 SRID 4326 */,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups_table`
--

LOCK TABLES `groups_table` WRITE;
/*!40000 ALTER TABLE `groups_table` DISABLE KEYS */;
INSERT INTO `groups_table` VALUES (1,'JavaScript Meet Up','We like to code','religious',1,'44124',0xE610000001010000009CDD5A26C35D54C0E8A38CB800C04440,'/assets/images/default-religious.jpg'),
(2,'Cleveland Hikers','You can hike if you want to.','outdoors',1,'44124',0xE610000001010000009CDD5A26C35D54C0E8A38CB800C04440,'/assets/images/default-outdoors.jpg'),
(3,'NE OH Zucchini Addict Recovery Group','Nobody should have to go through Zucchini recovery alone.','hobbies',1,'44124',0xE610000001010000009CDD5A26C35D54C0E8A38CB800C04440,'/assets/images/default-hobbies.jpg'),
(4,'Cleveland Bird Watchers','Come watch birds with us.','animals',1,'44124',0xE610000001010000009CDD5A26C35D54C0E8A38CB800C04440,'/assets/images/default-animals.jpg'),
(5,'Cleveland Moose Watchers','Come watch moose with us.','animals',1,'44124',0xE610000001010000009CDD5A26C35D54C0E8A38CB800C04440,'/assets/images/default-animals.jpg'),
(6,'Cleveland Horse Enthusiasts','We are enthusiastic about horses','animals',2,'44128',0xE61000000101000000AB933314776254C0BABA63B14DB84440,'/assets/images/default-animals.jpg'),
(7,'Chicago Hikers Association','We hike in Chicago','outdoors',11,'60601',0xE610000001010000009BC6F65AD0E755C07D06D49B51F14440,'/assets/images/default-outdoors.jpg'),
(8,'Chicago Pretzel Magicians','We pretzle magic in Chicago','hobbies',11,'60601',0xE610000001010000009BC6F65AD0E755C07D06D49B51F14440,'/assets/images/default-hobbies.jpg'),
(9,'Philly Musicians','We music in Philly','music',14,'19103',0xE610000001010000008670CCB227CB52C09F3E027FF8F94340,'/assets/images/default-music.jpg'),
(10,'Milly Phusicians','We phusic in Milly','hobbies',14,'19103',0xE610000001010000008670CCB227CB52C09F3E027FF8F94340,'/assets/images/default-hobbies.jpg'),
(11,'Pennsylvannia Cookers','We cook in Pennsylvannia','cooking',12,'15001',0xE610000001010000005CE84A04AA1454C06AC2F693314C4440,'/assets/images/default-cooking.jpg'),
(12,'Pennsylvannia Morticians','We embalm in Pennsylvannia','hobbies',12,'15001',0xE610000001010000005CE84A04AA1454C06AC2F693314C4440,'/assets/images/default-hobbies.jpg'),
(13,'DOTA 4 Gamers','We Dota in Michigan','hobbies',13,'49503',0xE610000001010000006F4BE482336A55C0EC6987BF267B4540,'/assets/images/default-hobbies.jpg'),
(14,'DOTA 5 Gamers','We Dota5 in Michigan','hobbies',13,'49503',0xE610000001010000006F4BE482336A55C0EC6987BF267B4540,'/assets/images/default-hobbies.jpg'),
(15,'Okalahoma Cattle Ranglers','We rangle in Okalahoma','animals',15,'73101',0xE610000001010000004016A243E048C8BF1EA7E8482EAF1640,'/assets/images/default-animals.jpg'),
(16,'Okalahoma Tumbleweeders','We rangle weeds in Okalahoma','outdoors',15,'73101',0xE610000001010000004016A243E048C8BF1EA7E8482EAF1640,'/assets/images/default-outdoors.jpg');
/*!40000 ALTER TABLE `groups_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `group_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`group_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,1),(1,2),(1,11),(1,12),(1,13),(1,14),(1,15),(2,1),(2,3),(2,4),(2,5),(2,6),(2,7),(2,8);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `group_id` int DEFAULT NULL,
  `author` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` varchar(255) DEFAULT NULL,
  `body` text,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,1,'2021-04-05 14:00:00','Dont forget to bring your own food to the cookout!','Last time we had a cookout some people forgot to bring their own food (Jane), and then caused a scene (Jane). Lets not have that happen again.'),(2,1,1,'2021-04-05 14:00:00','Thank You Everyone Who Attended Last Months Coding Exercise','It was dope');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Stephen','Hyde','stephen@friend.horse','$2y$10$tYJBwNCa/4rDspoPfNXBAeAzXdzmmMo9a8XaNICpZe7HJG2iKxbQ2'),(2,'Fred','Flintstone','fred@gmail.com','$2y$10$tYJBwNCa/4rDspoPfNXBAeAzXdzmmMo9a8XaNICpZe7HJG2iKxbQ2'),(3,'Sam','Smith','arbyslover@email.com','$2y$10$tYJBwNCa/4rDspoPfNXBAeAzXdzmmMo9a8XaNICpZe7HJG2iKxbQ2'),(4,'Dante','Alghieri','author@inferno.com','$2y$10$tYJBwNCa/4rDspoPfNXBAeAzXdzmmMo9a8XaNICpZe7HJG2iKxbQ2'),(5,'Thomas','McHorseradish','thomas@gmail.com','$2y$10$tYJBwNCa/4rDspoPfNXBAeAzXdzmmMo9a8XaNICpZe7HJG2iKxbQ2'),(6,'Billy','Jones','billy@gmail.com','$2y$10$tYJBwNCa/4rDspoPfNXBAeAzXdzmmMo9a8XaNICpZe7HJG2iKxbQ2'),(7,'Timmy','McLastname','timmy@gmail.com','$2y$10$tYJBwNCa/4rDspoPfNXBAeAzXdzmmMo9a8XaNICpZe7HJG2iKxbQ2'),(8,'Jane','Waterson','jane@gmail.com','$2y$10$tYJBwNCa/4rDspoPfNXBAeAzXdzmmMo9a8XaNICpZe7HJG2iKxbQ2'),(9,'Alfred','Freeman','alf@gmail.com','$2y$10$tYJBwNCa/4rDspoPfNXBAeAzXdzmmMo9a8XaNICpZe7HJG2iKxbQ2'),(10,'Ezekial','McHarrypotter','em@gmail.com','$2y$10$tYJBwNCa/4rDspoPfNXBAeAzXdzmmMo9a8XaNICpZe7HJG2iKxbQ2'),(11,'Colleen','McCohort','colleen@gmail.com','$2y$10$tYJBwNCa/4rDspoPfNXBAeAzXdzmmMo9a8XaNICpZe7HJG2iKxbQ2'),(12,'JiHang','McCohort','jihang@gmail.com','$2y$10$tYJBwNCa/4rDspoPfNXBAeAzXdzmmMo9a8XaNICpZe7HJG2iKxbQ2'),(13,'Adrian','McCohort','adrian@spelledright.com','$2y$10$tYJBwNCa/4rDspoPfNXBAeAzXdzmmMo9a8XaNICpZe7HJG2iKxbQ2'),(14,'Joe','McCohort','joe@gmail.com','$2y$10$tYJBwNCa/4rDspoPfNXBAeAzXdzmmMo9a8XaNICpZe7HJG2iKxbQ2'),(15,'Ross','McCohort','ross@gmail.com','$2y$10$tYJBwNCa/4rDspoPfNXBAeAzXdzmmMo9a8XaNICpZe7HJG2iKxbQ2');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-07 19:39:59
