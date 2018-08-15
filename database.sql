CREATE DATABASE hot_restaurants;

USE hot_restaurants;

CREATE TABLE reservations (
id INTEGER AUTO_INCREMENT NOT NULL,
user_name VARCHAR (200),
phone_number DECIMAL (10,2) NOT NULL,
email VARCHAR (200),
peart_name VARCHAR (200),
PRIMARY KEY (id)
);

CREATE TABLE wait_list (
id INTEGER AUTO_INCREMENT NOT NULL,
user_name VARCHAR (200),
phone_number DECIMAL (10,2) NOT NULL,
email VARCHAR (200),
peart_name VARCHAR (200),
PRIMARY KEY (id)
);
