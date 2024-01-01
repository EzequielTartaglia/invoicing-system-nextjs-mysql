-- Insert data to get a seed DB

INSERT INTO user (user_name, user_last_name, user_email, user_account, user_password, user_token, user_is_active, user_is_banned, user_created, user_modified) VALUES
  ('Ezequiel', 'Tartaglia', 'ezequielmtartaglia@gmail.com',"Ezequiel Software Engineer",'123123123','',FALSE,FALSE,now(),now());

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
