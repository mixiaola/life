-- MySQL dump 10.13  Distrib 5.7.22, for macos10.13 (x86_64)
--
-- Host: localhost    Database: life
-- ------------------------------------------------------
-- Server version	5.7.22-log

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
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administrator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (1,'admin','123456'),(2,'peijiancheng','123456');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imgUrl` varchar(100) DEFAULT NULL,
  `shopTitle` varchar(200) DEFAULT NULL,
  `ticketTitle` varchar(145) DEFAULT NULL,
  `intro` varchar(145) DEFAULT NULL,
  `validtiyStart` varchar(45) DEFAULT NULL,
  `validtiyEnd` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `address` varchar(145) DEFAULT NULL,
  `lag` varchar(45) DEFAULT NULL,
  `shopStartTime` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `introInfo` varchar(145) DEFAULT NULL,
  `personText` varchar(145) DEFAULT NULL,
  `label` varchar(45) DEFAULT NULL,
  `music` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
INSERT INTO `shop` VALUES (1,'https://img.momocdn.com/album/62/46/6246EA9E-F23A-B592-11F0-EF9471B924BF20161112_L.jpg','北欧家具','七折券','满100打七折','2018-07-05','2018-08-05','北京','朝阳区望京soho','116，37','早9：00，晚7:00','13796621250','https://img.momocdn.com/album/62/46/6246EA9E-F23A-B592-11F0-EF9471B924BF20161112_L.jpg','我买了这个，超便宜！','小清闲','1'),(3,'https://img.momocdn.com/album/62/46/6246EA9E-F23A-B592-11F0-EF9471B924BF20161112_L.jpg','北欧家具','七折券','满100打七折','2018-07-05','2018-08-05','北京','朝阳区望京soho','116，37','早9：00，晚7:00','13796621250','https://img.momocdn.com/album/62/46/6246EA9E-F23A-B592-11F0-EF9471B924BF20161112_L.jpg','我买了这个，超便宜！','小清闲','1'),(4,'https://img.momocdn.com/album/62/46/6246EA9E-F23A-B592-11F0-EF9471B924BF20161112_L.jpg','北欧家具','七折券','满100打七折','2018-07-05','2018-08-05','上海','朝阳区望京soho','116，37','早9：00，晚7:00','13796621250','https://img.momocdn.com/album/62/46/6246EA9E-F23A-B592-11F0-EF9471B924BF20161112_L.jpg','我买了这个，超便宜！','小清闲','1'),(5,'https://img.momocdn.com/album/62/46/6246EA9E-F23A-B592-11F0-EF9471B924BF20161112_L.jpg','北欧家具','七折券','满100打七折','2018-07-05','2018-08-05','北京','朝阳区望京soho','116，37','早9：00，晚7:00','13796621250','https://img.momocdn.com/album/62/46/6246EA9E-F23A-B592-11F0-EF9471B924BF20161112_L.jpg','我买了这个，超便宜！','小清闲','1');
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-06 11:40:54
