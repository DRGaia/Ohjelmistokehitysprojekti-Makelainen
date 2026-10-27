-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 27, 2026 at 01:29 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kurssienhallintajärjestelmä`
--

-- --------------------------------------------------------

--
-- Table structure for table `kurssikirjautumiset`
--

CREATE TABLE `kurssikirjautumiset` (
  `tunnus` int(10) UNSIGNED NOT NULL,
  `opiskelija_id` int(10) UNSIGNED NOT NULL,
  `kurssi_id` int(10) UNSIGNED NOT NULL,
  `kirjautumisaika` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kurssikirjautumiset`
--

INSERT INTO `kurssikirjautumiset` (`tunnus`, `opiskelija_id`, `kurssi_id`, `kirjautumisaika`) VALUES
(1, 1, 1, '2026-08-03 09:15:00'),
(2, 1, 2, '2026-08-03 09:20:00'),
(3, 1, 4, '2026-08-04 13:45:00'),
(4, 2, 2, '2026-08-05 10:05:00'),
(5, 2, 3, '2026-08-20 14:30:00'),
(6, 3, 3, '2026-08-21 08:50:00'),
(7, 3, 5, '2026-08-25 11:10:00'),
(8, 4, 1, '2026-08-03 12:00:00'),
(9, 4, 2, '2026-08-06 15:25:00'),
(10, 5, 3, '2026-08-22 16:40:00'),
(11, 5, 4, '2026-08-07 09:35:00'),
(12, 6, 5, '2026-08-26 10:00:00'),
(13, 6, 3, '2026-08-23 13:15:00'),
(14, 7, 1, '2026-08-04 08:30:00'),
(15, 7, 4, '2026-08-08 14:05:00'),
(16, 8, 2, '2026-08-09 11:55:00'),
(17, 8, 6, '2026-12-15 10:20:00'),
(18, 9, 5, '2026-08-27 09:45:00'),
(19, 9, 6, '2026-12-16 12:10:00');

-- --------------------------------------------------------

--
-- Table structure for table `kurssit`
--

CREATE TABLE `kurssit` (
  `tunnus` int(10) UNSIGNED NOT NULL,
  `nimi` varchar(150) NOT NULL,
  `kuvaus` text DEFAULT NULL,
  `alkupaiva` date NOT NULL,
  `loppupaiva` date NOT NULL,
  `opettaja_id` int(10) UNSIGNED NOT NULL,
  `tila_id` int(10) UNSIGNED NOT NULL
) ;

--
-- Dumping data for table `kurssit`
--

INSERT INTO `kurssit` (`tunnus`, `nimi`, `kuvaus`, `alkupaiva`, `loppupaiva`, `opettaja_id`, `tila_id`) VALUES
(1, 'Matematiikan perusteet', 'Algebra, funktiot ja derivointi.', '2026-08-17', '2026-12-18', 1, 1),
(2, 'Ohjelmoinnin perusteet', 'Ohjelmoinnin alkeet ja ongelmanratkaisu.', '2026-08-17', '2026-12-11', 2, 3),
(3, 'Tietokannat ja SQL', 'Relaatiotietokannat, kyselyt ja suunnittelu.', '2026-09-01', '2026-12-18', 3, 3),
(4, 'Teknisen alan englanti', 'Ammattisanasto ja raportointi.', '2026-08-24', '2026-11-27', 4, 2),
(5, 'Fysiikan perusteet', 'Mekaniikka ja sähköoppi laboratoriotöineen.', '2026-09-07', '2026-12-04', 5, 5),
(6, 'Tilastomatematiikka', 'Todennäköisyys ja tilastolliset menetelmät.', '2027-01-11', '2027-04-30', 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `opettajat`
--

CREATE TABLE `opettajat` (
  `tunnusnumero` int(10) UNSIGNED NOT NULL,
  `etunimi` varchar(50) NOT NULL,
  `sukunimi` varchar(50) NOT NULL,
  `aine` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `opettajat`
--

INSERT INTO `opettajat` (`tunnusnumero`, `etunimi`, `sukunimi`, `aine`) VALUES
(1, 'Maria', 'Virtanen', 'Matematiikka'),
(2, 'Jukka', 'Korhonen', 'Ohjelmointi'),
(3, 'Liisa', 'Nieminen', 'Tietokannat'),
(4, 'Antti', 'Mäkelä', 'Englanti'),
(5, 'Helena', 'Laine', 'Fysiikka'),
(7, 'Maria', 'Virtanen', 'Matematiikka');

-- --------------------------------------------------------

--
-- Table structure for table `opiskelijat`
--

CREATE TABLE `opiskelijat` (
  `opiskelijanumero` int(10) UNSIGNED NOT NULL,
  `etunimi` varchar(50) NOT NULL,
  `sukunimi` varchar(50) NOT NULL,
  `syntymapaiva` date NOT NULL,
  `vuosikurssi` tinyint(3) UNSIGNED NOT NULL
) ;

--
-- Dumping data for table `opiskelijat`
--

INSERT INTO `opiskelijat` (`opiskelijanumero`, `etunimi`, `sukunimi`, `syntymapaiva`, `vuosikurssi`) VALUES
(1, 'Aino', 'Heikkinen', '2005-03-14', 1),
(2, 'Eetu', 'Koskinen', '2004-11-02', 2),
(3, 'Veera', 'Järvinen', '2003-07-21', 3),
(4, 'Matias', 'Lehtonen', '2005-01-30', 1),
(5, 'Sofia', 'Saarinen', '2004-05-09', 2),
(6, 'Oskari', 'Salminen', '2003-09-17', 3),
(7, 'Emilia', 'Heinonen', '2005-12-05', 1),
(8, 'Leo', 'Niemi', '2004-02-25', 2),
(9, 'Ella', 'Kinnunen', '2003-04-11', 3),
(12, 'Aino', 'Heikkinen', '2005-03-14', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tilat`
--

CREATE TABLE `tilat` (
  `tunnus` int(10) UNSIGNED NOT NULL,
  `nimi` varchar(100) NOT NULL,
  `kapasiteetti` smallint(5) UNSIGNED NOT NULL
) ;

--
-- Dumping data for table `tilat`
--

INSERT INTO `tilat` (`tunnus`, `nimi`, `kapasiteetti`) VALUES
(1, 'Luokka A101', 30),
(2, 'Luokka A102', 25),
(3, 'Tietokoneluokka B201', 20),
(4, 'Auditorio', 120),
(5, 'Laboratorio C301', 16);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kurssikirjautumiset`
--
ALTER TABLE `kurssikirjautumiset`
  ADD PRIMARY KEY (`tunnus`),
  ADD UNIQUE KEY `uq_opiskelija_kurssi` (`opiskelija_id`,`kurssi_id`),
  ADD KEY `fk_kirj_kurssi` (`kurssi_id`);

--
-- Indexes for table `kurssit`
--
ALTER TABLE `kurssit`
  ADD PRIMARY KEY (`tunnus`),
  ADD KEY `fk_kurssi_opettaja` (`opettaja_id`),
  ADD KEY `fk_kurssi_tila` (`tila_id`);

--
-- Indexes for table `opettajat`
--
ALTER TABLE `opettajat`
  ADD PRIMARY KEY (`tunnusnumero`);

--
-- Indexes for table `opiskelijat`
--
ALTER TABLE `opiskelijat`
  ADD PRIMARY KEY (`opiskelijanumero`);

--
-- Indexes for table `tilat`
--
ALTER TABLE `tilat`
  ADD PRIMARY KEY (`tunnus`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kurssikirjautumiset`
--
ALTER TABLE `kurssikirjautumiset`
  MODIFY `tunnus` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `kurssit`
--
ALTER TABLE `kurssit`
  MODIFY `tunnus` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `opettajat`
--
ALTER TABLE `opettajat`
  MODIFY `tunnusnumero` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `opiskelijat`
--
ALTER TABLE `opiskelijat`
  MODIFY `opiskelijanumero` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tilat`
--
ALTER TABLE `tilat`
  MODIFY `tunnus` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kurssikirjautumiset`
--
ALTER TABLE `kurssikirjautumiset`
  ADD CONSTRAINT `fk_kirj_kurssi` FOREIGN KEY (`kurssi_id`) REFERENCES `kurssit` (`tunnus`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_kirj_opiskelija` FOREIGN KEY (`opiskelija_id`) REFERENCES `opiskelijat` (`opiskelijanumero`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `kurssit`
--
ALTER TABLE `kurssit`
  ADD CONSTRAINT `fk_kurssi_opettaja` FOREIGN KEY (`opettaja_id`) REFERENCES `opettajat` (`tunnusnumero`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_kurssi_tila` FOREIGN KEY (`tila_id`) REFERENCES `tilat` (`tunnus`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
