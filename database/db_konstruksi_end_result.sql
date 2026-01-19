-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: db_konstruksi
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `absensi_harian`
--

DROP TABLE IF EXISTS `absensi_harian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `absensi_harian` (
  `id` int NOT NULL AUTO_INCREMENT,
  `buruh_id` int NOT NULL,
  `tanggal` date NOT NULL,
  `status` enum('hadir','izin','alpha') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_buruh_tanggal` (`buruh_id`,`tanggal`),
  CONSTRAINT `absensi_harian_ibfk_1` FOREIGN KEY (`buruh_id`) REFERENCES `buruh` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absensi_harian`
--

LOCK TABLES `absensi_harian` WRITE;
/*!40000 ALTER TABLE `absensi_harian` DISABLE KEYS */;
INSERT INTO `absensi_harian` VALUES (1,1,'2026-01-19','hadir'),(2,2,'2026-01-19','alpha'),(3,3,'2026-01-19','izin'),(4,4,'2026-01-19','hadir'),(9,5,'2026-01-19','izin'),(94,6,'2026-01-19','izin');
/*!40000 ALTER TABLE `absensi_harian` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buruh`
--

DROP TABLE IF EXISTS `buruh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buruh` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) NOT NULL,
  `mandor_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mandor_id` (`mandor_id`),
  CONSTRAINT `buruh_ibfk_1` FOREIGN KEY (`mandor_id`) REFERENCES `mandor` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buruh`
--

LOCK TABLES `buruh` WRITE;
/*!40000 ALTER TABLE `buruh` DISABLE KEYS */;
INSERT INTO `buruh` VALUES (1,'Komang Putra',1),(2,'Ketut Arya',1),(3,'Putu Satria',2),(4,'Sukajati',1),(5,'Putu Wirata',2),(6,'Rai Merta',3),(7,'Rai Merta',2),(8,'Sukajati',2),(9,'Sukajat',2);
/*!40000 ALTER TABLE `buruh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mandor`
--

DROP TABLE IF EXISTS `mandor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mandor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) NOT NULL,
  `pekerjaan` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mandor`
--

LOCK TABLES `mandor` WRITE;
/*!40000 ALTER TABLE `mandor` DISABLE KEYS */;
INSERT INTO `mandor` VALUES (1,'Wayan Kejer','Pemasangan Fondasi'),(2,'Made Wirata','Pengecoran Lantai'),(3,'Dwi Mahesa','');
/*!40000 ALTER TABLE `mandor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `progress`
--

DROP TABLE IF EXISTS `progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `progress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mandor_id` int NOT NULL,
  `tanggal` date NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `persentase` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `mandor_id` (`mandor_id`),
  CONSTRAINT `progress_ibfk_1` FOREIGN KEY (`mandor_id`) REFERENCES `mandor` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `progress`
--

LOCK TABLES `progress` WRITE;
/*!40000 ALTER TABLE `progress` DISABLE KEYS */;
INSERT INTO `progress` VALUES (2,1,'2025-01-15','Pengecoran lantai 1',25,'2026-01-19 05:23:46'),(6,2,'2026-01-19','Menyusun Batu Bata',60,'2026-01-19 14:30:03');
/*!40000 ALTER TABLE `progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `progress_buruh`
--

DROP TABLE IF EXISTS `progress_buruh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `progress_buruh` (
  `id` int NOT NULL AUTO_INCREMENT,
  `progress_id` int NOT NULL,
  `buruh_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_progress_buruh` (`progress_id`,`buruh_id`),
  KEY `buruh_id` (`buruh_id`),
  CONSTRAINT `progress_buruh_ibfk_1` FOREIGN KEY (`progress_id`) REFERENCES `progress` (`id`) ON DELETE CASCADE,
  CONSTRAINT `progress_buruh_ibfk_2` FOREIGN KEY (`buruh_id`) REFERENCES `buruh` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `progress_buruh`
--

LOCK TABLES `progress_buruh` WRITE;
/*!40000 ALTER TABLE `progress_buruh` DISABLE KEYS */;
INSERT INTO `progress_buruh` VALUES (5,2,1),(4,2,2),(3,2,4),(16,6,7),(17,6,9);
/*!40000 ALTER TABLE `progress_buruh` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-19 23:14:03
