DROP DATABASE IF EXISTS hot_restaurants;

CREATE DATABASE hot_restaurants;

USE hot_restaurants;

CREATE TABLE reservations (
id INTEGER AUTO_INCREMENT NOT NULL,
name VARCHAR (200),
phone_number INTEGER(10) NOT NULL,
email VARCHAR (200),
party_name VARCHAR (200),
PRIMARY KEY (id)
);

CREATE TABLE wait_list (
id INTEGER AUTO_INCREMENT NOT NULL,
name VARCHAR (200),
phone_number INTEGER(10) NOT NULL,
email VARCHAR (200),
party_name VARCHAR (200),
PRIMARY KEY (id)
);


SELECT * FROM reservations;