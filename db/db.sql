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
    password VARCHAR(255) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- DESCRIBE user;

CREATE TABLE category(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(400),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- DESCRIBE category;

CREATE TABLE product(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(400),
    category_id INT NOT NULL,
    price DECIMAL,
    stock_quantity INT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES category(id)
);
-- DESCRIBE product;

CREATE TABLE purchase(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    purchase_date DATETIME NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_purchase_user FOREIGN KEY (user_id) REFERENCES user(id),
    CONSTRAINT fk_purchase_product FOREIGN KEY (product_id) REFERENCES product(id),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- DESCRIBE purchase;


-- Insert data to get a little DB
INSERT INTO category (name, description) VALUES
  ('Bebidas', 'Bebidas con alcohol, bebidas sin alcohol, etc.'),
  ('Golosinas', 'Chocolate, caramelos, chupetines, etc.'),
  ('Cigarrillos', 'Tabaco, papelillos, etc.'),
  ('Almacen', 'Alimentos, bebidas, aperitivos, etc.'),
  ('Salud y belleza', 'Productos de higiene, cosméticos, etc.');

  INSERT INTO product (name, description, category_id, price, stock_quantity) VALUES
  ('Agua', 'Descipcion de ejemplo', 1, 1000.00, 32),
  ('Chocolate', 'Descipcion de ejemplo', 2, 2000.00, 34),
  ('Cigarrillo 1', 'Descipcion de ejemplo', 1, 1500.00, 40),
  ('Queso', 'Descipcion de ejemplo', 3, 500.00, 230),
  ('Shampoo', 'Descipcion de ejemplo', 1, 3000.00, 239);
