-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2024 at 02:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `playground`
--

-- --------------------------------------------------------

--
-- Table structure for table `applicants`
--

CREATE TABLE `applicants` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `middleName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `birthMonth` varchar(255) NOT NULL,
  `birthDay` int(11) NOT NULL,
  `birthYear` int(11) NOT NULL,
  `age` int(11) NOT NULL,
  `civilStatus` varchar(255) NOT NULL,
  `sex` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `altEmail` varchar(255) NOT NULL,
  `homeAddress` varchar(255) NOT NULL,
  `highestEducationalAttainment` varchar(255) NOT NULL,
  `lastSchoolAttended` varchar(255) NOT NULL,
  `bpoExpYears` int(11) NOT NULL,
  `bpoExpPosition` varchar(255) NOT NULL,
  `endorsementDate` date NOT NULL,
  `interviewTime` varchar(255) NOT NULL,
  `resume` text NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applicants`
--

INSERT INTO `applicants` (`id`, `firstName`, `middleName`, `lastName`, `birthMonth`, `birthDay`, `birthYear`, `age`, `civilStatus`, `sex`, `contact`, `email`, `altEmail`, `homeAddress`, `highestEducationalAttainment`, `lastSchoolAttended`, `bpoExpYears`, `bpoExpPosition`, `endorsementDate`, `interviewTime`, `resume`, `userId`) VALUES
(1, 'Ria Denise', 'Saya-ang', 'Hamor', 'November', 11, 2002, 21, 'Single', 'Female', '0938493729', 'thesispasser@gmail.com', 'dgs@gmail.com', 'vgadvr', 'College Graduate', 'aff', 2, 'daeg', '2024-01-11', '11 AM', 'C:\\fakepath\\Sample Resume.pdf', 1123),
(2, 'John', 'Doe', 'Swift', 'November', 8, 1991, 33, 'Married', 'Male', '0938493745', 'johndoe@gmail.com', 'jd@gmail.com', 'sadasf', 'College Graduate', 'fsefe', 2, 'csf', '2024-01-27', '12 PM', 'C:\\fakepath\\Sample Resume.pdf', 1123);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `userId`) VALUES
(1, 'Aliana ', 'ali@gmail.com', '$2a$10$rZpg59aN2gSx.ht45JkBZ.x2ySeeOyveiWXD7NbJJmPvIjJSBzmb2', 1123);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `altEmail` (`altEmail`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applicants`
--
ALTER TABLE `applicants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
