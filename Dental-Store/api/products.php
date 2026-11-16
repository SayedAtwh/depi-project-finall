<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

$request_method = $_SERVER["REQUEST_METHOD"];

switch($request_method) {
    case 'GET':
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        if($id) {
            $query = "SELECT Product_ID, Name, Category, price, Stock_qty, image_url FROM Products WHERE Product_ID = ? LIMIT 1";
            $stmt = $db->prepare($query);
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            if($row) {
                
                $row['price'] = (float)$row['price'];
                $row['Stock_qty'] = (int)$row['Stock_qty'];
                http_response_code(200);
                echo json_encode($row);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Product not found."));
            }
        } else {
            $query = "SELECT Product_ID, Name, Category, price, Stock_qty, image_url FROM Products ORDER BY Product_ID DESC";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $result = $stmt->get_result();
            $num = $result->num_rows;
            if($num > 0) {
                $products_arr = array();
                while ($row = $result->fetch_assoc()) {
                    $row['price'] = (float)$row['price'];
                    $row['Stock_qty'] = (int)$row['Stock_qty'];
                    array_push($products_arr, $row);
                }
                http_response_code(200);
                echo json_encode($products_arr);
            } else {
                http_response_code(200);
                echo json_encode(array());
            }
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        if(!empty($data->Name) && isset($data->price)) {
            $query = "INSERT INTO Products SET Name=?, Category=?, price=?, Stock_qty=?, image_url=?";
            $stmt = $db->prepare($query);
            
            $name = htmlspecialchars(strip_tags($data->Name));
            $category = isset($data->Category) ? htmlspecialchars(strip_tags($data->Category)) : null;
            $price = htmlspecialchars(strip_tags($data->price));
            $stock_qty = isset($data->Stock_qty) ? htmlspecialchars(strip_tags($data->Stock_qty)) : 0;
            $image_url = isset($data->image_url) ? htmlspecialchars(strip_tags($data->image_url)) : null;

            $stmt->bind_param("ssdis", $name, $category, $price, $stock_qty, $image_url);

            if($stmt->execute()) {
                http_response_code(201);
                echo json_encode(array("message" => "Product created.", "id" => $db->insert_id));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create product."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to create product. Data is incomplete."));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        if(!empty($data->Product_ID) && !empty($data->Name) && isset($data->price)) {
            $query = "UPDATE Products SET Name=?, Category=?, price=?, Stock_qty=?, image_url=? WHERE Product_ID=?";
            $stmt = $db->prepare($query);
            
            $id = htmlspecialchars(strip_tags($data->Product_ID));
            $name = htmlspecialchars(strip_tags($data->Name));
            $category = isset($data->Category) ? htmlspecialchars(strip_tags($data->Category)) : null;
            $price = htmlspecialchars(strip_tags($data->price));
            $stock_qty = isset($data->Stock_qty) ? htmlspecialchars(strip_tags($data->Stock_qty)) : 0;
            $image_url = isset($data->image_url) ? htmlspecialchars(strip_tags($data->image_url)) : null;

            $stmt->bind_param("ssdisi", $name, $category, $price, $stock_qty, $image_url, $id);

            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "Product updated."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to update product."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to update product. Incomplete data."));
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $id = isset($_GET['id']) ? $_GET['id'] : (isset($data->Product_ID) ? $data->Product_ID : null);
        
        if(!empty($id)) {
            $query = "DELETE FROM Products WHERE Product_ID = ?";
            $stmt = $db->prepare($query);
            $id = htmlspecialchars(strip_tags($id));
            $stmt->bind_param("i", $id);

            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "Product deleted."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to delete product."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to delete product. ID is missing."));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;
}
?>
