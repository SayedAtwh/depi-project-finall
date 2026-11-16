USE dental_store;

-- Clear existing data if any (optional but good for clean seeding)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE order_details;
TRUNCATE TABLE orders;
TRUNCATE TABLE Products;
TRUNCATE TABLE Customers;
TRUNCATE TABLE admins;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert Admins
INSERT INTO admins (username, password_hash) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert Customers
INSERT INTO Customers (Name, Phone_num, address) VALUES
('John Doe', '+1-555-0198', '123 Campus Drive, Med City, NY 10012'),
('Sarah Miller', '+1-555-0245', '456 Student Housing, Dental Block, NY 10012'),
('Dr. Alan Grant', '+1-555-0888', '789 Faculty Clinic, Univ Hosp, NY 10011'),
('Emily Chen', '+1-555-0456', '321 Grad Apt, Med City, NY 10012');

CREATE TABLE IF NOT EXISTS Products (
    Product_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Category VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    Stock_qty INT NOT NULL DEFAULT 0,
    image_url VARCHAR(500) DEFAULT NULL
);

INSERT INTO Products (Name, Category, price, Stock_qty, image_url) VALUES
('Dental Typodont / Study Models', 'Practice Models', 45.99, 50, 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80'),
('Extraction Forceps Set', 'Surgical Instruments', 120.50, 20, 'https://images.unsplash.com/photo-1598256989800-fea5ce5146ce?w=400&q=80'),
('High-Speed Dental Handpiece', 'Equipment', 199.99, 15, 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&q=80'),
('Composite Placement Instruments', 'Restorative', 35.00, 30, 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80'),
('Dental Curing Light LED', 'Equipment', 85.00, 25, 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80'),
('Binocular Dental Loupes 3.5X', 'Vision', 150.00, 10, 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80'),
('Alginate Impression Material', 'Materials', 18.50, 100, 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80'),
('Basic Examination Kit', 'Diagnostic', 15.99, 200, 'https://images.unsplash.com/photo-1598256989800-fea5ce5146ce?w=400&q=80'),
('Suture Practice Kit', 'Practice Kits', 25.00, 40, 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&q=80'),
('Endodontic K-Files Set', 'Endodontics', 22.50, 50, 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80');

-- Insert Orders
-- Assuming OrderDate is CURRENT_DATE for recent ones
INSERT INTO orders (order_date, Customer_ID) VALUES
(CURRENT_DATE - INTERVAL 5 DAY, 1),
(CURRENT_DATE - INTERVAL 2 DAY, 2),
(CURRENT_DATE - INTERVAL 1 DAY, 1),
(CURRENT_DATE, 4);

-- Insert Order Details
-- Order 1 (John Doe bought Typodont and Basic Exam Kit)
INSERT INTO order_details (order_ID, product_ID, quantity) VALUES
(1, 1, 1),
(1, 8, 2);

-- Order 2 (Sarah Miller bought Curing Light and Composite Instruments)
INSERT INTO order_details (order_ID, product_ID, quantity) VALUES
(2, 5, 1),
(2, 4, 1);

-- Order 3 (John Doe bought Alginate Material)
INSERT INTO order_details (order_ID, product_ID, quantity) VALUES
(3, 7, 5);

-- Order 4 (Emily Chen bought Suture Practice Kit)
INSERT INTO order_details (order_ID, product_ID, quantity) VALUES
(4, 9, 1);
