-- Create DB
CREATE DATABASE IF NOT EXISTS invoicing_system_db;

-- Use schema
USE invoicing_system_db;

-- Create Tables
CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
--DESCRIBE user;

CREATE TABLE product(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(400),
    category_id INT NOT NULL,
    price DECIMAL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES category(id)
);
--DESCRIBE product;

CREATE TABLE category(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(400)
);
--DESCRIBE category;

CREATE TABLE purchase(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date DATETIME NOT NULL,
    items JSON NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_purchase_user FOREIGN KEY (user_id) REFERENCES user(id)
);
--DESCRIBE purchase;
