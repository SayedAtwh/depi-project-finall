<?php
include_once 'config/database.php';
$database = new Database();
$conn = $database->getServerConnection();
$dbName = $database->getDbName();
$conn->exec("USE `$dbName`");

try {
    $sql = file_get_contents("seed.sql");
    $conn->exec($sql);
    echo "Seed executed successfully!\n";
} catch(PDOException $e) {
    echo "Seed SQL Failed: " . $e->getMessage() . "\n";
}
?>
