-- Customers Table
CREATE TABLE IF NOT EXISTS customers (
  id           INT AUTO_INCREMENT       PRIMARY KEY,
  name         VARCHAR(100)             NOT NULL,
  email        VARCHAR(100)             UNIQUE NOT NULL,
  phone        VARCHAR(20),
  INDEX index_id_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;