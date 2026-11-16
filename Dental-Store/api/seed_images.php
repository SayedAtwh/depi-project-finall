<?php
include_once 'c:\xampp\htdocs\dentalstore\api\config\database.php';
$database = new Database();
$db = $database->getServerConnection();
$db->select_db($database->getDbName());

$dentalProducts = [
    [
      "Name" => "Dental Typodont / Study Models",
      "price" => 45.99,
      "Category" => "Practice Models",
      "image_url" => "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80"
    ],
    [
      "Name" => "Extraction Forceps Set",
      "price" => 120.50,
      "Category" => "Surgical Instruments",
      "image_url" => "https://images.unsplash.com/photo-1598256989800-fea5ce5146ce?w=400&q=80"
    ],
    [
      "Name" => "High-Speed Dental Handpiece",
      "price" => 199.99,
      "Category" => "Equipment",
      "image_url" => "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&q=80"
    ],
    [
      "Name" => "Composite Placement Instruments",
      "price" => 35.00,
      "Category" => "Restorative",
      "image_url" => "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80"
    ],
    [
      "Name" => "Dental Curing Light LED",
      "price" => 85.00,
      "Category" => "Equipment",
      "image_url" => "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80"
    ],
    [
      "Name" => "Binocular Dental Loupes 3.5X",
      "price" => 150.00,
      "Category" => "Vision",
      "image_url" => "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80"
    ],
    [
      "Name" => "Alginate Impression Material",
      "price" => 18.50,
      "Category" => "Materials",
      "image_url" => "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80"
    ],
    [
      "Name" => "Basic Examination Kit",
      "price" => 15.99,
      "Category" => "Diagnostic",
      "image_url" => "https://images.unsplash.com/photo-1598256989800-fea5ce5146ce?w=400&q=80"
    ],
    [
      "Name" => "Suture Practice Kit",
      "price" => 25.00,
      "Category" => "Practice Kits",
      "image_url" => "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&q=80"
    ],
    [
      "Name" => "Endodontic K-Files Set",
      "price" => 22.50,
      "Category" => "Endodontics",
      "image_url" => "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80"
    ]
];

$db->query("DELETE FROM Products"); 

$stmt = $db->prepare("INSERT INTO Products (Name, Category, price, Stock_qty, image_url) VALUES (?, ?, ?, 50, ?)");

foreach ($dentalProducts as $p) {
    if (!$stmt) { echo $db->error; break; }
    $stmt->bind_param("ssds", $p["Name"], $p["Category"], $p["price"], $p["image_url"]);
    $stmt->execute();
}
echo "Populated Products table successfully.";
?>
