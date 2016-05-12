-- MySQL dump 10.14  Distrib 5.5.47-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: mediamondb
-- ------------------------------------------------------
-- Server version	5.5.47-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_current_usage`
--

DROP TABLE IF EXISTS `tbl_current_usage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_current_usage` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `rtimestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `bytein` bigint(50) DEFAULT NULL,
  `byteout` bigint(50) DEFAULT NULL,
  `connection` bigint(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=404 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_current_usage`
--

LOCK TABLES `tbl_current_usage` WRITE;
/*!40000 ALTER TABLE `tbl_current_usage` DISABLE KEYS */;
INSERT INTO `tbl_current_usage` VALUES (3,'2016-05-09 00:52:01',336245,0,0),(4,'2016-05-09 00:53:01',304086,0,0),(5,'2016-05-09 00:54:01',362930,0,0),(6,'2016-05-09 00:55:01',356522,0,0),(7,'2016-05-09 00:56:01',310963,0,0),(8,'2016-05-09 00:57:01',352920,0,0),(9,'2016-05-09 00:58:01',309175,0,0),(10,'2016-05-09 00:59:01',381150,0,0),(11,'2016-05-09 01:00:02',380073,0,0),(12,'2016-05-09 01:01:01',399489,0,0),(13,'2016-05-09 01:02:01',377644,0,0),(14,'2016-05-09 01:03:01',298716,0,0),(15,'2016-05-09 01:04:01',321433,0,0),(16,'2016-05-09 01:05:01',399235,0,0),(17,'2016-05-09 01:06:01',306021,0,0),(18,'2016-05-09 01:07:01',380623,0,0),(19,'2016-05-09 01:08:01',365236,0,0),(20,'2016-05-09 01:09:01',304829,0,0),(21,'2016-05-09 01:10:01',338369,0,0),(22,'2016-05-09 01:11:01',371988,0,0),(23,'2016-05-09 01:12:01',288886,0,0),(24,'2016-05-09 01:13:01',314198,0,0),(25,'2016-05-09 01:14:01',167058,0,0),(26,'2016-05-09 01:15:01',287010,0,0),(27,'2016-05-09 01:16:01',327420,0,0),(28,'2016-05-09 01:17:01',360129,0,0),(29,'2016-05-09 01:18:01',352943,0,0),(30,'2016-05-09 01:19:01',323225,0,0),(31,'2016-05-09 01:20:01',319727,0,0),(32,'2016-05-09 01:21:01',372690,0,0),(33,'2016-05-09 01:22:01',319371,0,0),(34,'2016-05-09 01:23:01',341434,0,0),(35,'2016-05-09 01:24:02',320590,0,0),(36,'2016-05-09 01:25:01',355180,0,0),(37,'2016-05-09 01:26:01',317906,0,0),(38,'2016-05-09 01:27:01',341976,0,0),(39,'2016-05-09 01:28:01',303162,0,0),(40,'2016-05-09 01:29:01',323021,0,0),(41,'2016-05-09 01:30:01',357726,0,0),(42,'2016-05-09 01:31:01',306234,0,0),(43,'2016-05-09 01:32:01',371439,0,0),(44,'2016-05-09 01:33:01',322685,0,0),(45,'2016-05-09 01:34:01',368417,0,0),(46,'2016-05-09 01:35:01',370753,0,0),(47,'2016-05-09 01:36:01',338684,0,0),(48,'2016-05-09 01:37:01',344610,0,0),(49,'2016-05-09 01:38:01',337378,0,0),(50,'2016-05-09 01:39:01',357329,0,0),(51,'2016-05-09 01:40:01',0,0,0),(52,'2016-05-09 01:41:01',335703,0,0),(53,'2016-05-09 01:42:01',266231,0,0),(54,'2016-05-09 01:43:01',335517,0,0),(55,'2016-05-09 01:55:09',423823,0,0),(56,'2016-05-09 01:55:52',330531,0,0),(57,'2016-05-09 01:56:01',439344,0,0),(58,'2016-05-09 01:56:27',288650,0,0),(59,'2016-05-09 01:57:01',309243,320018,1),(60,'2016-05-09 01:58:01',362572,334697,1),(61,'2016-05-09 01:59:01',228857,253546,1),(62,'2016-05-09 02:00:01',354927,346394,1),(63,'2016-05-09 02:01:01',381257,369925,1),(64,'2016-05-09 02:02:01',386939,375908,1),(65,'2016-05-09 02:03:01',213512,196097,1),(66,'2016-05-09 02:04:01',277760,274738,1),(67,'2016-05-09 02:05:01',398298,372731,1),(68,'2016-05-09 02:06:01',432675,401048,1),(69,'2016-05-09 02:07:01',403899,400739,1),(70,'2016-05-09 02:08:01',310383,333836,1),(71,'2016-05-09 02:09:01',349517,350442,1),(72,'2016-05-09 02:10:02',302698,325281,1),(73,'2016-05-09 02:11:01',500283,483164,1),(74,'2016-05-09 02:12:01',0,0,1),(75,'2016-05-09 02:13:01',466108,0,0),(76,'2016-05-09 02:14:01',587735,0,0),(77,'2016-05-09 02:15:01',512715,0,0),(78,'2016-05-09 02:16:01',518494,0,0),(79,'2016-05-09 02:17:01',483507,0,0),(80,'2016-05-09 02:18:01',615833,0,0),(81,'2016-05-09 02:19:02',562562,0,0),(82,'2016-05-09 02:20:01',400795,0,0),(83,'2016-05-09 02:21:01',433692,0,0),(84,'2016-05-09 02:22:01',489233,0,0),(85,'2016-05-09 02:23:01',455455,0,0),(86,'2016-05-09 02:24:01',342893,0,0),(87,'2016-05-09 02:25:01',485652,0,0),(88,'2016-05-09 02:26:01',427959,0,0),(89,'2016-05-09 02:27:01',371656,0,0),(90,'2016-05-09 02:28:01',401970,0,0),(91,'2016-05-09 02:29:01',394458,0,0),(92,'2016-05-09 02:30:01',409920,0,0),(93,'2016-05-09 02:31:01',497115,0,0),(94,'2016-05-09 02:32:01',474745,0,0),(95,'2016-05-09 02:33:01',405263,0,0),(96,'2016-05-09 02:34:01',510703,0,0),(97,'2016-05-09 02:35:01',513658,0,0),(98,'2016-05-09 02:36:01',497441,0,0),(99,'2016-05-09 02:37:01',468176,0,0),(100,'2016-05-09 02:38:01',464478,0,0),(101,'2016-05-09 02:39:01',403488,0,0),(102,'2016-05-09 02:40:01',441247,0,0),(103,'2016-05-09 02:41:01',432722,0,0),(104,'2016-05-09 02:42:01',468109,0,0),(105,'2016-05-09 02:43:01',408061,0,0),(106,'2016-05-09 02:44:01',538455,0,0),(107,'2016-05-09 02:45:02',403130,0,0),(108,'2016-05-09 02:46:01',358412,0,0),(109,'2016-05-09 02:47:01',633587,0,0),(110,'2016-05-09 02:48:01',658667,0,0),(111,'2016-05-09 02:49:01',531707,0,0),(112,'2016-05-09 02:50:01',500142,0,0),(113,'2016-05-09 02:51:01',615004,0,0),(114,'2016-05-09 02:52:01',496358,0,0),(115,'2016-05-09 02:53:01',487454,0,0),(116,'2016-05-09 02:54:01',464400,0,0),(117,'2016-05-09 02:55:01',442080,0,0),(118,'2016-05-09 02:56:01',450581,0,0),(119,'2016-05-09 02:57:01',440336,0,0),(120,'2016-05-09 02:58:01',363134,0,0),(121,'2016-05-09 02:59:01',497066,0,0),(122,'2016-05-09 03:00:01',461730,0,0),(123,'2016-05-09 03:01:01',473469,0,0),(124,'2016-05-09 03:02:01',463682,0,0),(125,'2016-05-09 03:03:01',494508,0,0),(126,'2016-05-09 03:04:01',415046,0,0),(127,'2016-05-09 03:05:01',405960,0,0),(128,'2016-05-09 03:06:01',362664,0,0),(129,'2016-05-09 03:07:01',441266,0,0),(130,'2016-05-09 03:08:02',522607,0,0),(131,'2016-05-09 03:09:01',435666,0,0),(132,'2016-05-09 03:10:01',401979,0,0),(133,'2016-05-09 03:11:01',446050,0,0),(134,'2016-05-09 03:12:01',524683,0,0),(135,'2016-05-09 03:13:01',458651,0,0),(136,'2016-05-09 03:14:01',452334,0,0),(137,'2016-05-09 03:15:01',531973,0,0),(138,'2016-05-09 03:16:01',459140,0,0),(139,'2016-05-09 03:17:01',485819,0,0),(140,'2016-05-09 03:18:01',511321,0,0),(141,'2016-05-09 03:19:01',432429,0,0),(142,'2016-05-09 03:20:01',434226,0,0),(143,'2016-05-09 03:21:01',519359,0,0),(144,'2016-05-09 03:22:01',481268,0,0),(145,'2016-05-09 03:23:01',522981,0,0),(146,'2016-05-09 03:24:01',447273,0,0),(147,'2016-05-09 03:25:01',498841,0,0),(148,'2016-05-09 03:26:01',517635,0,0),(149,'2016-05-09 03:27:01',526974,0,0),(150,'2016-05-09 03:28:01',518977,0,0),(151,'2016-05-09 03:29:01',418043,0,0),(152,'2016-05-09 03:30:01',463809,0,0),(153,'2016-05-09 03:31:01',495590,0,0),(154,'2016-05-09 03:32:02',508653,0,0),(155,'2016-05-09 03:33:01',430631,0,0),(156,'2016-05-09 03:34:01',634331,0,0),(157,'2016-05-09 03:35:01',577110,0,0),(158,'2016-05-09 03:36:01',567732,0,0),(159,'2016-05-09 03:37:01',408872,0,0),(160,'2016-05-09 03:38:01',483198,0,0),(161,'2016-05-09 03:39:01',383459,0,0),(162,'2016-05-09 03:40:01',434991,0,0),(163,'2016-05-09 03:41:01',488585,0,0),(164,'2016-05-09 03:42:01',479583,0,0),(165,'2016-05-09 03:43:01',392352,0,0),(166,'2016-05-09 03:44:01',518311,0,0),(167,'2016-05-09 03:45:01',511517,0,0),(168,'2016-05-09 03:46:01',422876,0,0),(169,'2016-05-09 03:47:01',435598,0,0),(170,'2016-05-09 03:48:01',462262,0,0),(171,'2016-05-09 03:49:01',536402,0,0),(172,'2016-05-09 03:50:01',535949,0,0),(173,'2016-05-09 03:51:01',448219,0,0),(174,'2016-05-09 03:52:01',434527,0,0),(175,'2016-05-09 03:53:01',435380,0,0),(176,'2016-05-09 03:54:01',446702,0,0),(177,'2016-05-09 03:55:01',524815,0,0),(178,'2016-05-09 03:56:01',434281,0,0),(179,'2016-05-09 03:57:01',387949,0,0),(180,'2016-05-09 03:58:02',417555,0,0),(181,'2016-05-09 03:59:01',415820,0,0),(182,'2016-05-09 04:00:01',452576,0,0),(183,'2016-05-09 04:01:01',336859,0,0),(184,'2016-05-09 04:02:01',432735,0,0),(185,'2016-05-09 04:03:01',523624,0,0),(186,'2016-05-09 04:04:01',527023,0,0),(187,'2016-05-09 04:05:01',419008,0,0),(188,'2016-05-09 04:06:01',443044,0,0),(189,'2016-05-09 04:07:01',453021,0,0),(190,'2016-05-09 04:08:01',455421,0,0),(191,'2016-05-09 04:09:01',413335,0,0),(192,'2016-05-09 04:10:01',504542,0,0),(193,'2016-05-09 04:11:01',554534,0,0),(194,'2016-05-09 04:12:01',516616,0,0),(195,'2016-05-09 04:13:01',439586,0,0),(196,'2016-05-09 04:14:01',515089,0,0),(197,'2016-05-09 04:15:01',498242,0,0),(198,'2016-05-09 04:16:01',498028,0,0),(199,'2016-05-09 04:17:01',529291,0,0),(200,'2016-05-09 04:18:01',460118,0,0),(201,'2016-05-09 04:19:01',542741,0,0),(202,'2016-05-09 04:20:01',513532,0,0),(203,'2016-05-09 04:21:02',462181,0,0),(204,'2016-05-09 04:22:01',592247,0,0),(205,'2016-05-09 04:23:01',543664,0,0),(206,'2016-05-09 04:24:01',410543,0,0),(207,'2016-05-09 04:25:01',505646,0,0),(208,'2016-05-09 04:26:01',424676,0,0),(209,'2016-05-09 04:27:01',409424,0,0),(210,'2016-05-09 04:28:01',479813,0,0),(211,'2016-05-09 04:29:01',502715,0,0),(212,'2016-05-09 04:30:01',436503,0,0),(213,'2016-05-09 04:31:01',462507,0,0),(214,'2016-05-09 04:32:01',510288,0,0),(215,'2016-05-09 04:33:01',445739,0,0),(216,'2016-05-09 04:34:01',491045,0,0),(217,'2016-05-09 04:35:01',452530,0,0),(218,'2016-05-09 04:36:01',475756,0,0),(219,'2016-05-09 04:37:01',479083,0,0),(220,'2016-05-09 04:38:01',346232,0,0),(221,'2016-05-09 04:39:01',503974,0,0),(222,'2016-05-09 04:40:01',548678,0,0),(223,'2016-05-09 04:41:01',511084,0,0),(224,'2016-05-09 04:42:01',513585,0,0),(225,'2016-05-09 04:43:01',495492,0,0),(226,'2016-05-09 04:44:01',517913,0,0),(227,'2016-05-09 04:45:01',447260,0,0),(228,'2016-05-09 04:46:01',360703,0,0),(229,'2016-05-09 04:47:01',447210,0,0),(230,'2016-05-09 04:48:01',489310,0,0),(231,'2016-05-09 04:49:01',520446,0,0),(232,'2016-05-09 04:50:01',524753,0,0),(233,'2016-05-09 04:51:01',397114,0,0),(234,'2016-05-09 04:52:01',445639,0,0),(235,'2016-05-09 04:53:01',446157,0,0),(236,'2016-05-09 04:54:01',0,0,0),(237,'2016-05-09 04:55:01',440299,0,0),(238,'2016-05-09 04:56:01',444623,0,0),(239,'2016-05-09 04:57:01',427759,0,0),(240,'2016-05-09 04:58:01',779333,0,0),(241,'2016-05-09 04:59:01',455939,0,0),(242,'2016-05-09 05:00:01',426436,0,0),(243,'2016-05-09 05:01:01',481008,0,0),(244,'2016-05-09 05:02:01',604087,0,0),(245,'2016-05-09 05:03:01',439680,0,0),(246,'2016-05-09 05:04:01',522826,0,0),(247,'2016-05-09 05:05:01',534160,0,0),(248,'2016-05-09 05:06:01',529226,0,0),(249,'2016-05-09 05:07:01',432119,0,0),(250,'2016-05-09 05:08:01',479201,0,0),(251,'2016-05-09 05:09:02',375468,0,0),(252,'2016-05-09 05:10:01',554451,0,0),(253,'2016-05-09 05:11:01',399726,0,0),(254,'2016-05-09 05:12:01',438868,0,0),(255,'2016-05-09 05:13:01',501094,0,0),(256,'2016-05-09 05:14:01',452161,0,0),(257,'2016-05-09 05:15:01',479635,0,0),(258,'2016-05-09 05:16:01',317403,0,0),(259,'2016-05-09 05:17:01',526003,0,0),(260,'2016-05-09 05:18:01',421487,0,0),(261,'2016-05-09 05:19:01',544479,0,0),(262,'2016-05-09 05:20:01',482934,0,0),(263,'2016-05-09 05:21:01',434667,0,0),(264,'2016-05-09 05:22:01',503377,0,0),(265,'2016-05-09 05:23:01',508876,0,0),(266,'2016-05-09 05:24:01',504638,0,0),(267,'2016-05-09 05:25:01',546175,0,0),(268,'2016-05-09 05:26:01',510624,0,0),(269,'2016-05-09 05:27:01',484059,0,0),(270,'2016-05-09 05:28:01',542812,0,0),(271,'2016-05-09 05:29:01',523101,0,0),(272,'2016-05-09 05:30:01',531406,0,0),(273,'2016-05-09 05:31:01',475761,0,0),(274,'2016-05-09 05:32:01',494714,0,0),(275,'2016-05-09 05:33:02',534652,0,0),(276,'2016-05-09 05:34:01',511457,0,0),(277,'2016-05-09 05:35:01',524213,0,0),(278,'2016-05-09 05:36:01',471894,0,0),(279,'2016-05-09 05:37:01',540111,0,0),(280,'2016-05-09 05:38:01',506051,0,0),(281,'2016-05-09 05:39:01',510286,0,0),(282,'2016-05-09 05:40:01',554080,0,0),(283,'2016-05-09 05:41:01',520367,0,0),(284,'2016-05-09 05:42:01',491928,0,0),(285,'2016-05-09 05:43:01',526864,0,0),(286,'2016-05-09 05:44:01',503272,0,0),(287,'2016-05-09 05:45:01',511132,0,0),(288,'2016-05-09 05:46:01',491816,0,0),(289,'2016-05-09 05:47:01',0,0,0),(290,'2016-05-09 05:48:01',0,0,0),(291,'2016-05-09 05:49:01',0,0,0),(292,'2016-05-09 05:50:01',269577,0,0),(293,'2016-05-09 05:51:01',295037,0,0),(294,'2016-05-09 05:52:01',280603,0,0),(295,'2016-05-09 05:53:01',276665,0,0),(296,'2016-05-09 05:54:01',276574,0,0),(297,'2016-05-09 05:55:02',286845,0,0),(298,'2016-05-09 05:56:01',290076,0,0),(299,'2016-05-09 05:57:01',301154,0,0),(300,'2016-05-09 05:58:01',291140,0,0),(301,'2016-05-09 05:59:01',256542,0,0),(302,'2016-05-09 06:00:01',269796,0,0),(303,'2016-05-09 06:01:01',238933,0,0),(304,'2016-05-09 06:02:01',121049,0,0),(305,'2016-05-09 06:03:01',0,0,0),(306,'2016-05-09 06:04:01',0,0,0),(307,'2016-05-09 06:05:01',238342,0,0),(308,'2016-05-09 06:06:01',169736,0,0),(309,'2016-05-09 06:07:01',257650,0,0),(310,'2016-05-09 06:08:01',0,0,0),(311,'2016-05-09 06:09:01',0,0,0),(312,'2016-05-09 06:10:01',0,0,0),(313,'2016-05-09 06:11:01',0,0,0),(314,'2016-05-09 06:12:01',0,0,0),(315,'2016-05-09 06:13:01',0,0,0),(316,'2016-05-09 06:14:02',0,0,0),(317,'2016-05-09 06:15:02',0,0,0),(318,'2016-05-09 06:16:02',0,0,0),(319,'2016-05-09 06:17:01',0,0,0),(320,'2016-05-09 06:18:01',0,0,0),(321,'2016-05-09 06:19:01',0,0,0),(322,'2016-05-09 06:20:01',0,0,0),(323,'2016-05-09 06:21:01',0,0,0),(324,'2016-05-09 06:22:01',0,0,0),(325,'2016-05-09 06:23:01',0,0,0),(326,'2016-05-09 06:24:01',0,0,0),(327,'2016-05-09 06:25:01',267732,0,0),(328,'2016-05-09 06:26:01',363545,0,0),(329,'2016-05-11 10:19:02',0,0,0),(330,'2016-05-11 10:20:01',0,0,0),(331,'2016-05-11 10:21:01',0,0,0),(332,'2016-05-11 10:22:01',0,0,0),(333,'2016-05-11 10:23:01',0,0,0),(334,'2016-05-11 10:24:01',0,0,0),(335,'2016-05-11 10:25:01',0,0,0),(336,'2016-05-11 10:26:01',0,0,0),(337,'2016-05-11 10:27:01',0,0,0),(338,'2016-05-11 10:28:01',0,0,0),(339,'2016-05-11 10:29:01',0,0,0),(340,'2016-05-11 10:30:01',0,0,0),(341,'2016-05-11 10:31:01',0,0,0),(342,'2016-05-11 10:32:01',0,0,0),(343,'2016-05-11 10:33:01',0,0,0),(344,'2016-05-11 10:34:01',0,0,0),(345,'2016-05-11 10:35:01',0,0,0),(346,'2016-05-11 10:36:01',0,0,0),(347,'2016-05-11 10:37:01',0,0,0),(348,'2016-05-11 10:38:01',0,0,0),(349,'2016-05-11 10:39:01',0,0,0),(350,'2016-05-11 10:40:01',0,0,0),(351,'2016-05-11 10:41:01',0,0,0),(352,'2016-05-11 10:42:01',0,0,0),(353,'2016-05-11 10:43:01',0,0,0),(354,'2016-05-11 10:44:01',0,0,0),(355,'2016-05-11 10:45:01',0,0,0),(356,'2016-05-11 10:46:02',0,0,0),(357,'2016-05-11 10:47:01',0,0,0),(358,'2016-05-11 10:48:01',0,0,0),(359,'2016-05-11 10:49:01',0,0,0),(360,'2016-05-11 10:50:01',0,0,0),(361,'2016-05-11 10:51:01',0,0,0),(362,'2016-05-11 10:52:01',0,0,0),(363,'2016-05-11 10:53:01',0,0,0),(364,'2016-05-11 10:54:01',0,0,0),(365,'2016-05-11 10:55:01',0,0,0),(366,'2016-05-11 10:56:01',0,0,0),(367,'2016-05-11 10:57:01',0,0,0),(368,'2016-05-11 10:58:01',0,0,0),(369,'2016-05-11 10:59:01',0,0,0),(370,'2016-05-11 11:00:01',0,0,0),(371,'2016-05-11 11:01:01',0,0,0),(372,'2016-05-11 11:02:01',0,0,0),(373,'2016-05-11 11:03:01',0,0,0),(374,'2016-05-11 11:04:01',0,0,0),(375,'2016-05-11 11:05:01',0,0,0),(376,'2016-05-11 11:06:01',0,0,0),(377,'2016-05-11 11:07:01',0,0,0),(378,'2016-05-11 11:08:01',0,0,0),(379,'2016-05-11 11:09:02',0,0,0),(380,'2016-05-11 11:10:01',0,0,0),(381,'2016-05-11 11:11:01',0,0,0),(382,'2016-05-11 11:12:01',0,0,0),(383,'2016-05-11 11:51:01',0,0,0),(384,'2016-05-11 11:52:01',513913,0,0),(385,'2016-05-11 11:53:01',495022,0,0),(386,'2016-05-11 11:54:01',518906,0,0),(387,'2016-05-11 11:55:01',518538,0,0),(388,'2016-05-11 11:56:01',514638,0,0),(389,'2016-05-11 11:57:01',493040,0,0),(390,'2016-05-11 11:58:01',511782,0,0),(391,'2016-05-11 11:59:01',512936,0,0),(392,'2016-05-11 12:00:01',511094,0,0),(393,'2016-05-11 12:01:01',516808,0,0),(394,'2016-05-11 12:02:01',512159,0,0),(395,'2016-05-13 06:52:02',0,0,0),(396,'2016-05-13 06:53:01',0,0,0),(397,'2016-05-13 06:54:01',0,0,0),(398,'2016-05-13 06:55:01',0,0,0),(399,'2016-05-13 06:56:01',0,0,0),(400,'2016-05-13 06:57:01',0,0,0),(401,'2016-05-13 06:58:02',0,0,0),(402,'2016-05-13 06:59:01',0,0,0),(403,'2016-05-13 07:00:01',0,0,0);
/*!40000 ALTER TABLE `tbl_current_usage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_customer_account`
--

DROP TABLE IF EXISTS `tbl_customer_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_customer_account` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `person1` varchar(45) DEFAULT NULL,
  `person2` varchar(45) DEFAULT NULL,
  `person3` varchar(45) DEFAULT NULL,
  `person4` varchar(45) DEFAULT NULL,
  `mobile1` varchar(45) DEFAULT NULL,
  `mobile2` varchar(45) DEFAULT NULL,
  `mobile3` varchar(45) DEFAULT NULL,
  `mobile4` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `vgi` varchar(45) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastlogin` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `password` varchar(256) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `company_logo` varchar(256) DEFAULT NULL,
  `company_name` varchar(256) DEFAULT NULL,
  `company_description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_customer_account`
--

LOCK TABLES `tbl_customer_account` WRITE;
/*!40000 ALTER TABLE `tbl_customer_account` DISABLE KEYS */;
INSERT INTO `tbl_customer_account` VALUES (2,'doi','goi','','','','888-000-9999','','','','doi@doi.com','999-000-0000','doi','2016-05-07 08:45:50','0000-00-00 00:00:00','cc19ad25eef37f441971eda5de429ad5bdbb5b6bcb45d20de22c48778fbc29a7',1,'','',''),(6,'mycompany','mystaff','','','','000-000-0000','','','','put@mycompany.com','999-000-0000','jaja@vgi.com','2016-05-07 13:42:27','0000-00-00 00:00:00','2e9b6a0a97fb0b14af1cb5eeea1bba3b3d44e66b2a5b13a8f74938d6bc0fb197',1,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Wikimedia-logo.svg/1200px-Wikimedia-logo.svg.png','mycompany public limited company','here is my company');
/*!40000 ALTER TABLE `tbl_customer_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_system_account`
--

DROP TABLE IF EXISTS `tbl_system_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_system_account` (
  `uid` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(256) NOT NULL,
  `firstname` varchar(256) NOT NULL,
  `lastname` varchar(256) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastlogin` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `enabled` tinyint(1) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_system_account`
--

LOCK TABLES `tbl_system_account` WRITE;
/*!40000 ALTER TABLE `tbl_system_account` DISABLE KEYS */;
INSERT INTO `tbl_system_account` VALUES (2,'doi','Kritsada','Tavarasumida','2016-05-05 07:44:28','2016-05-11 11:50:26',1,'2e9b6a0a97fb0b14af1cb5eeea1bba3b3d44e66b2a5b13a8f74938d6bc0fb197'),(3,'put','Wanvipa','Tavarasumida','2016-05-09 00:53:03','2016-05-09 01:26:25',1,'2e9b6a0a97fb0b14af1cb5eeea1bba3b3d44e66b2a5b13a8f74938d6bc0fb197');
/*!40000 ALTER TABLE `tbl_system_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tags`
--

DROP TABLE IF EXISTS `tbl_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_tags` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(45) NOT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tags`
--

LOCK TABLES `tbl_tags` WRITE;
/*!40000 ALTER TABLE `tbl_tags` DISABLE KEYS */;
INSERT INTO `tbl_tags` VALUES (2,'1tag23'),(4,'mytag'),(5,'test');
/*!40000 ALTER TABLE `tbl_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tags_mapping`
--

DROP TABLE IF EXISTS `tbl_tags_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_tags_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tags_mapping`
--

LOCK TABLES `tbl_tags_mapping` WRITE;
/*!40000 ALTER TABLE `tbl_tags_mapping` DISABLE KEYS */;
INSERT INTO `tbl_tags_mapping` VALUES (4,2,2);
/*!40000 ALTER TABLE `tbl_tags_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_usage_history`
--

DROP TABLE IF EXISTS `tbl_usage_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_usage_history` (
  `id` bigint(20) NOT NULL,
  `cid` bigint(20) NOT NULL,
  `action` varchar(45) NOT NULL,
  `module` varchar(45) NOT NULL,
  `did` varchar(45) NOT NULL,
  `device_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_usage_history`
--

LOCK TABLES `tbl_usage_history` WRITE;
/*!40000 ALTER TABLE `tbl_usage_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_usage_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `v_tags_customer`
--

DROP TABLE IF EXISTS `v_tags_customer`;
/*!50001 DROP VIEW IF EXISTS `v_tags_customer`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_tags_customer` (
  `id` tinyint NOT NULL,
  `tid` tinyint NOT NULL,
  `cid` tinyint NOT NULL,
  `username` tinyint NOT NULL,
  `tag_name` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_tags_customer`
--

/*!50001 DROP TABLE IF EXISTS `v_tags_customer`*/;
/*!50001 DROP VIEW IF EXISTS `v_tags_customer`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_tags_customer` AS select `t`.`id` AS `id`,`t`.`tid` AS `tid`,`t`.`cid` AS `cid`,`r`.`username` AS `username`,`l`.`tag_name` AS `tag_name` from ((`tbl_tags_mapping` `t` join `tbl_customer_account` `r` on((`r`.`cid` = `t`.`cid`))) join `tbl_tags` `l` on((`l`.`tid` = `t`.`tid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-13 14:00:49
