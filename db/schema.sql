-- Customers Table
CREATE TABLE IF NOT EXISTS customers (
  id           INT AUTO_INCREMENT       PRIMARY KEY,
  name         VARCHAR(100)             NOT NULL,
  email        VARCHAR(100)             UNIQUE NOT NULL,
  phone        VARCHAR(20),
  status       BOOLEAN                  DEFAULT 1,
  INDEX index_id_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id          INT AUTO_INCREMENT                          PRIMARY KEY,
  customer_id INT                                         NOT NULL,
  total_cents DECIMAL(10,2)                               NOT NULL DEFAULT 0,
  created_at  TIMESTAMP                                   DEFAULT CURRENT_TIMESTAMP,
  status      ENUM('CREATED', 'CONFIRMED', 'CANCELED')    DEFAULT 'CREATED',
  -- Clave foránea (relación con customers.id)
  CONSTRAINT fk_orders_customers
      FOREIGN KEY (customer_id)
      REFERENCES customers(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id          INT                     AUTO_INCREMENT PRIMARY KEY,
  sku         VARCHAR(50)             NOT NULL UNIQUE,
  name        VARCHAR(150)            NOT NULL,
  price_cents DECIMAL(10,2)           NOT NULL,
  stock       INT                     DEFAULT 0,
  created_at  TIMESTAMP               DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Crear tabla order_items si no existe
CREATE TABLE IF NOT EXISTS order_items (
  id                INT             AUTO_INCREMENT PRIMARY KEY,
  order_id          INT             NOT NULL,
  product_id        INT             NOT NULL,
  qty               INT             NOT NULL,
  unit_price_cents  DECIMAL(10,2)   NOT NULL,
  subtotal_cents    DECIMAL(10,2)   NOT NULL,
  -- Foreign keys order
  CONSTRAINT fk_order_items_order
      FOREIGN KEY (order_id)
      REFERENCES orders(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  -- Foreign keys product
  CONSTRAINT fk_order_items_product
      FOREIGN KEY (product_id)
      REFERENCES products(id)
      ON DELETE RESTRICT
      ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Crear tabla idempotency_keys si no existe
CREATE TABLE IF NOT EXISTS idempotency_keys (
  key_id          VARCHAR(100)                            PRIMARY KEY,
  target_type     VARCHAR(50)                             NOT NULL,
  target_id       INT UNSIGNED                            NOT NULL,
  status          ENUM('PENDING', 'COMPLETED', 'FAILED')  DEFAULT 'PENDING',
  response_body   TEXT,
  created_at      TIMESTAMP                               DEFAULT CURRENT_TIMESTAMP,
  expires_at      TIMESTAMP                               NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;