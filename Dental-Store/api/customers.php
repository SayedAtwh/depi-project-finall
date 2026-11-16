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
            $query = "SELECT ID, Name, Phone_num, address FROM Customers WHERE ID = ? LIMIT 1";
            $stmt = $db->prepare($query);
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            if($row) {
                http_response_code(200);
                echo json_encode($row);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Customer not found."));
            }
        } else {
            $query = "SELECT ID, Name, Phone_num, address FROM Customers ORDER BY ID DESC";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $result = $stmt->get_result();
            $num = $result->num_rows;
            if($num > 0) {
                $customers_arr = array();
                while ($row = $result->fetch_assoc()) {
                    array_push($customers_arr, $row);
                }
                http_response_code(200);
                echo json_encode($customers_arr);
            } else {
                http_response_code(200);
                echo json_encode(array()); 
            }
        }
        break;

    case 'POST':
        
        $data = json_decode(file_get_contents("php://input"));
        if(!empty($data->Name)) {
            $query = "INSERT INTO Customers SET Name=?, Phone_num=?, address=?";
            $stmt = $db->prepare($query);
            
            
            $name = htmlspecialchars(strip_tags($data->Name));
            $phone = isset($data->Phone_num) ? htmlspecialchars(strip_tags($data->Phone_num)) : null;
            $address = isset($data->address) ? htmlspecialchars(strip_tags($data->address)) : null;

            $stmt->bind_param("sss", $name, $phone, $address);

            if($stmt->execute()) {
                http_response_code(201);
                echo json_encode(array("message" => "Customer created.", "id" => $db->insert_id));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create customer."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to create customer. Data is incomplete."));
        }
        break;

    case 'PUT':
        
        $data = json_decode(file_get_contents("php://input"));
        if(!empty($data->ID) && !empty($data->Name)) {
            $query = "UPDATE Customers SET Name=?, Phone_num=?, address=? WHERE ID=?";
            $stmt = $db->prepare($query);
            
            $id = htmlspecialchars(strip_tags($data->ID));
            $name = htmlspecialchars(strip_tags($data->Name));
            $phone = isset($data->Phone_num) ? htmlspecialchars(strip_tags($data->Phone_num)) : null;
            $address = isset($data->address) ? htmlspecialchars(strip_tags($data->address)) : null;

            $stmt->bind_param("sssi", $name, $phone, $address, $id);

            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "Customer updated."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to update customer."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to update customer. Incomplete data."));
        }
        break;

    case 'DELETE':
        
        $data = json_decode(file_get_contents("php://input"));
        
        $id = isset($_GET['id']) ? $_GET['id'] : (isset($data->ID) ? $data->ID : null);
        
        if(!empty($id)) {
            $query = "DELETE FROM Customers WHERE ID = ?";
            $stmt = $db->prepare($query);
            $id = htmlspecialchars(strip_tags($id));
            $stmt->bind_param("i", $id);

            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "Customer deleted."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to delete customer."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to delete customer. ID is missing."));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;
}
?>
