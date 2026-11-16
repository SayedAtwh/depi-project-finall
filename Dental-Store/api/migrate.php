<?php
include_once 'c:\xampp\htdocs\dentalstore\api\config\database.php';
$database = new Database();
$db = $database->getServerConnection();
$dbName = $database->getDbName();
$db->select_db($dbName);

$sql = "ALTER TABLE Products ADD COLUMN image_url VARCHAR(500) DEFAULT NULL";
if ($db->query($sql) === TRUE) {
    echo "Column image_url added successfully.";
} else {
    echo "Error updating table: " . $db->error;
}
?>
