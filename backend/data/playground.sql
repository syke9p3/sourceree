-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 29, 2023 at 06:39 PM
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
  `clientCompany` varchar(255) NOT NULL,
  `clientCompanySite` varchar(255) NOT NULL,
  `applicantStatus` varchar(255) NOT NULL,
  `agencyRemarks` varchar(255) DEFAULT NULL,
  `clientCompanyRemarks` varchar(255) DEFAULT NULL,
  `resume` text NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applicants`
--

INSERT INTO `applicants` (`id`, `firstName`, `middleName`, `lastName`, `birthMonth`, `birthDay`, `birthYear`, `age`, `civilStatus`, `sex`, `contact`, `email`, `altEmail`, `homeAddress`, `highestEducationalAttainment`, `lastSchoolAttended`, `bpoExpYears`, `bpoExpPosition`, `endorsementDate`, `interviewTime`, `clientCompany`, `clientCompanySite`, `applicantStatus`, `agencyRemarks`, `clientCompanyRemarks`, `resume`, `userId`) VALUES
(1, 'John', 'Doe', 'Smith', 'January', 15, 1990, 32, 'Married', 'Male', '123-456-7890', 'john.doe@example.com', 'john.alt@example.com', '123 Main Street, Cityville', 'Bachelor\'s Degree', 'University of City', 5, 'Customer Service Representative', '2023-01-20', '10:00 AM', 'ABC Tech Solutions', 'Tech Park', 'Active', 'Good communication skills', 'Needs further technical evaluation', 'resume_file.pdf', 1),
(2, 'Aliana', 'Jana', 'San', 'January', 1, 1991, 31, 'Married', 'Female', '123-456-7890', 'aliana@example.com', 'aliana.alt@example.com', '123 Main Street, Cityville', 'High School', 'University of City', 5, 'Customer Service Representative', '2023-01-20', '10:00 AM', 'ABC Tech Solutions', 'Tech Park', 'Active', 'Good communication skills', 'Needs further technical evaluation', 'resume_file.pdf', 1),
(3, 'Taylor', 'Alison', 'Swift', 'September', 10, 2014, 21, 'Single', 'Female', '0938493729', 'taylor@gmail.com', 'taylorswift@gmail.com', 'asvr', 'bdrtbtrg', 'nbstrf', 4, 'sbddv', '2023-12-29', '11 AM', 'sbrfdr', 'srb', 'Active', 'N/A', 'N/A', 'C:\\fakepath\\pup.png', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'Johna', 'johna@gmail.com', '$2a$10$iJZK1B6x5QRFrA0zPTvSuubyHHutA1L52fmtcwt.ypPwpLCq7JUiK');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
