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
    product_price DECIMAL,
    product_stock_quantity INT,
    product_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    product_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES category(category_id)
);
-- DESCRIBE product;

CREATE TABLE purchase(
    purchase_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    purchase_date DATETIME NOT NULL,
    purchase_total DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_purchase_user FOREIGN KEY (user_id) REFERENCES user(user_id),
    CONSTRAINT fk_purchase_product FOREIGN KEY (product_id) REFERENCES product(product_id),
    purchase_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    purchase_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- DESCRIBE purchase;


-- Insert data to get a seed DB
INSERT INTO category (category_name, category_description) VALUES
  ('Bebidas', 'Bebidas con alcohol, bebidas sin alcohol, etc.'),
  ('Golosinas', 'Chocolate, caramelos, chupetines, etc.'),
  ('Cigarrillos', 'Tabaco, papelillos, etc.'),
  ('Almacen', 'Alimentos, bebidas, aperitivos, etc.'),
  ('Salud y belleza', 'Productos de higiene, cosméticos, etc.');

  INSERT INTO product (product_name, product_description, category_id, product_price, product_stock_quantity) VALUES
  ('Agua', 'Descripcion de ejemplo', 1, 1000.00, 32),
  ('Chocolate', 'Descripcion de ejemplo', 2, 2000.00, 34),
  ('Cigarrillo 1', 'Descripcion de ejemplo', 1, 1500.00, 40),
  ('Queso', 'Descripcion de ejemplo', 3, 500.00, 230),
  ('Shampoo', 'Descripcion de ejemplo', 1, 3000.00, 239);
