-- Create database
CREATE DATABASE IF NOT EXISTS soccer;
USE soccer;

-- Create table for soccer leagues
-- Each league can have multiple leagues
CREATE TABLE IF NOT EXISTS leagues(
  idleague INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL,
  startDate DATETIME NOT NULL DEFAULT NOW(),
  endDate DATETIME NOT NULL DEFAULT NOW(),
  enabled BIT DEFAULT 1
 );
 
 -- Create table for soccer teams
 -- Each team can be in multiple leagues
 CREATE TABLE IF NOT EXISTS teams(
 idteam INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
 name VARCHAR(50) NOT NULL,
 country VARCHAR(50) NOT NULL,
 playersQuantity INT NOT NULL CHECK (playersQuantity >=11) CHECK (playersQuantity <=22),
 enabled BIT DEFAULT 1
 );
 
 -- Create table to manage the teams registered on the leagues
 CREATE TABLE IF NOT EXISTS registers(
 idleague INT NOT NULL,
 idteam INT NOT NULL,
 enabled BIT DEFAULT 1,
 PRIMARY KEY (idleague, idteam),
 CONSTRAINT fkleague FOREIGN KEY (idleague) REFERENCES leagues (idleague) ON DELETE CASCADE,
 CONSTRAINT fkregisteredteam FOREIGN KEY (idteam) REFERENCES teams (idteam) ON DELETE CASCADE
 );