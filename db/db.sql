-- Create DB
CREATE DATABASE IF NOT EXISTS invoicing_system_db;

-- Use schema
USE invoicing_system_db;

-- Create Tables
CREATE TABLE user(
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_last_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- DESCRIBE user;

CREATE TABLE category(
    category_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    category_description VARCHAR(400),
    category_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- DESCRIBE category;

CREATE TABLE product(
    product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_description VARCHAR(400),
    category_id INT NOT NULL,
    product_price DECIMAL(10,2),
    product_stock_quantity INT,
    product_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    product_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES category(category_id)
);
-- DESCRIBE product;

CREATE TABLE sale(
    sale_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    sale_date DATETIME NOT NULL,
    sale_total DECIMAL(10,2) NOT NULL,
    sale_is_closed BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_sale_user FOREIGN KEY (user_id) REFERENCES user(user_id),
    sale_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sale_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- DESCRIBE sale;

CREATE TABLE sale_item(
    sale_item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    sale_item_total DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_sale_item_product FOREIGN KEY (product_id) REFERENCES product(product_id),
    CONSTRAINT fk_sale_item_sale FOREIGN KEY (sale_id) REFERENCES sale(sale_id),
    sale_item_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sale_item_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- DESCRIBE sale_item;

