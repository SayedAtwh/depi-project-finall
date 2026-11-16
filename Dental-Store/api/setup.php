<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");

include_once 'config/database.php';

$database = new Database();
$conn = $database->getServerConnection();
$dbName = $database->getDbName();

if ($conn) {
    try {
        
        $sql = "CREATE DATABASE IF NOT EXISTS `$dbName` CHARACTER SET utf8 COLLATE utf8_general_ci";
        $conn->query($sql);
        echo "Database '$dbName' created successfully or already exists.\n";
        
        
        $conn->select_db($dbName);

        
        $sqlCustomers = "CREATE TABLE IF NOT EXISTS `Customers` (
            `ID` INT AUTO_INCREMENT PRIMARY KEY,
            `Name` VARCHAR(255) NOT NULL,
            `Phone_num` VARCHAR(50),
            `address` TEXT
        ) ENGINE=InnoDB;";
        $conn->query($sqlCustomers);
        echo "Table 'Customers' created successfully or already exists.\n";

        
        $sqlProducts = "CREATE TABLE IF NOT EXISTS `Products` (
            `Product_ID` INT AUTO_INCREMENT PRIMARY KEY,
            `Name` VARCHAR(255) NOT NULL,
            `Category` VARCHAR(100),
            `price` DECIMAL(10, 2) NOT NULL,
            `Stock_qty` INT NOT NULL DEFAULT 0,
            `image_url` VARCHAR(500) DEFAULT NULL
        ) ENGINE=InnoDB;";
        $conn->query($sqlProducts);
        echo "Table 'Products' created successfully or already exists.\n";

        
        $sqlOrders = "CREATE TABLE IF NOT EXISTS `orders` (
            `order_ID` INT AUTO_INCREMENT PRIMARY KEY,
            `Customer_ID` INT NOT NULL,
            `order_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (`Customer_ID`) REFERENCES `Customers`(`ID`) ON DELETE CASCADE
        ) ENGINE=InnoDB;";
        $conn->query($sqlOrders);
        echo "Table 'orders' created successfully or already exists.\n";

        
        $sqlOrderDetails = "CREATE TABLE IF NOT EXISTS `order_details` (
            `ID` INT AUTO_INCREMENT PRIMARY KEY,
            `order_ID` INT NOT NULL,
            `product_ID` INT NOT NULL,
            `quantity` INT NOT NULL,
            FOREIGN KEY (`order_ID`) REFERENCES `orders`(`order_ID`) ON DELETE CASCADE,
            FOREIGN KEY (`product_ID`) REFERENCES `Products`(`Product_ID`) ON DELETE CASCADE
        ) ENGINE=InnoDB;";
        $conn->query($sqlOrderDetails);
        echo "Table 'order_details' created successfully or already exists.\n";

        
        $sqlAdmins = "CREATE TABLE IF NOT EXISTS `admins` (
            `admin_id` INT AUTO_INCREMENT PRIMARY KEY,
            `username` VARCHAR(255) NOT NULL UNIQUE,
            `password_hash` VARCHAR(255) NOT NULL
        ) ENGINE=InnoDB;";
        $conn->query($sqlAdmins);
        echo "Table 'admins' created successfully or already exists.\n";

        echo "\nSetup completed successfully! You can now use the API.";
        
    } catch (Exception $e) {
        echo "Error creating database/tables: " . $e->getMessage() . "\n";
    }
} else {
    echo "Could not connect to the database server. Please check your credentials in config/database.php.";
}
?>
