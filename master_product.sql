-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2019 at 08:44 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `master_product`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id_category` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `date_add` date DEFAULT NULL,
  `date_update` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id_category`, `name`, `date_add`, `date_update`) VALUES
(1, 'vegetable', '2019-09-27', '2019-09-27'),
(2, 'fruit', '2019-09-27', '2019-09-27'),
(3, 'seasoning', '2019-09-27', '2019-09-27'),
(4, 'meat', '2019-09-27', '2019-09-27');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id_product` varchar(100) NOT NULL DEFAULT 'AUTO_INCREMENT',
  `name` varchar(50) DEFAULT NULL,
  `description` text,
  `picture` varchar(50) DEFAULT NULL,
  `id_category` int(11) DEFAULT NULL,
  `price` int(15) DEFAULT NULL,
  `date_add` varchar(50) DEFAULT NULL,
  `date_update` varchar(50) DEFAULT NULL,
  `qty` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id_product`, `name`, `description`, `picture`, `id_category`, `price`, `date_add`, `date_update`, `qty`) VALUES
('d21b2e30-e10a-11e9-8cca-3906a850a970', 'Chilli peppers', 'Chilli peppers are a good source of vitamin C and contain a raft of other vitamins and minerals. However, for most people chilli peppers are eaten only in small quantities so are more important for flavour than nutritional value.enak tenan', 'img-1569577220241-7.png', 1, 35000, '2019-09-27', '2019-09-27', 4),
('e1a81220-e112-11e9-8b85-1117915e352e', 'Broccoli ', 'Broccoli is a good source of vitamin C, and one serving [1 cup] easily provides an adult\'s vitamin C requirements for a day. It is also a source of dietary fibre, folate, niacin, riboflavin, vitamin A, vitamin B6, and contains a dietary significant amount of potassium. Phytonutrients, including glucosinolates, phenolic compounds and carotenoids, are abundant in broccoli.', 'img-1569599423095-12.jpeg', 1, 10000, '2019-09-27', '2019-09-27', 4);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `email`, `password`) VALUES
('c323c620-e147-11e9-82d0-d5b119b0356b', 'Iwa28a@gmail.com', 'Iwan'),
('c5bb19d0-e0fa-11e9-8a79-ef13f8880fba', 'Iwan28@gmail.com', 'Iwan');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `FK_product_category` (`id_category`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_product_category` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
