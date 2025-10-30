-- Insert datafake customers table
INSERT INTO customers (name, email, phone, status) VALUES
('Juan Perez', 'juan.perez@example.com', '+593987654321', 1),
('Maria Lopez', 'maria.lopez@example.com', '+593998877665', 1),
('Carlos Herrera', 'carlos.herrera@example.com', '+593912345678', 1),
('Ana Torres', 'ana.torres@example.com', '+593976543210', 1),
('Luis Martinez', 'luis.martinez@example.com', '+593995551234', 1),
('Sofia Gomez', 'sofia.gomez@example.com', '+593923456789', 1),
('Pedro Ramirez', 'pedro.ramirez@example.com', '+593911122233', 1),
('Laura Sánchez', 'laura.sanchez@example.com', '+593988877766', 1),
('Diego Castillo', 'diego.castillo@example.com', '+593977665544', 1),
('Valeria Cruz', 'valeria.cruz@example.com', '+593966554433', 1);

-- Insert datafake products table
INSERT INTO products (sku, name, price_cents, stock) VALUES
('SKU-001', 'Hamburguesa Clasica', 599, 50),
('SKU-002', 'Papas Fritas Grandes', 299, 100),
('SKU-003', 'Refresco 500ml', 199, 200),
('SKU-004', 'Combo Familiar', 1999, 30),
('SKU-005', 'Helado de Vainilla', 249, 75);

-- Insert datafake idempotency table
INSERT INTO idempotency_keys (key_id, target_type, target_id, status, response_body, expires_at) VALUES
('abc123', 'order', 1, 'COMPLETED', '{"message": "Order created"}', DATE_ADD(NOW(), INTERVAL 1 DAY)),
('xyz789', 'order', 2, 'PENDING', NULL, DATE_ADD(NOW(), INTERVAL 2 DAY)),
('uuid-0001', 'payment', 5, 'FAILED', '{"error": "Insufficient funds"}', DATE_ADD(NOW(), INTERVAL 3 DAY));

-- Insert datafake orders table
INSERT INTO order (id, customer_id, total_cents, create_at, status) VALUES
(1, 2, 1497, NOW(), 'CREATED')
(2, 3, 199, NOW(), 'CONFIRMED')
(3, 4, 1999, NOW(), 'CANCEL')

-- Insert datafake order_items table
INSERT INTO order_items (order_id, product_id, qty, unit_price_cents, subtotal_cents) VALUES
(1, 1, 2, 599, 1198),
(1, 2, 1, 299, 299),
(2, 3, 3, 199, 597),
(3, 4, 1, 1999, 1999);