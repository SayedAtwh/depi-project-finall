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
        $order_id = isset($_GET['order_id']) ? $_GET['order_id'] : null;
        if($order_id) {
            $query = "SELECT ID, order_ID, product_ID, quantity FROM order_details WHERE order_ID = ?";
            $stmt = $db->prepare($query);
            $stmt->bind_param("i", $order_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $num = $result->num_rows;
            if($num > 0) {
                $details_arr = array();
                while ($row = $result->fetch_assoc()) {
                    $row['quantity'] = (int)$row['quantity'];
                    array_push($details_arr, $row);
                }
                http_response_code(200);
                echo json_encode($details_arr);
            } else {
                http_response_code(200);
                echo json_encode(array());
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Please provide an order_id to get details."));
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        if(!empty($data->order_ID) && !empty($data->product_ID) && !empty($data->quantity)) {
            $query = "INSERT INTO order_details SET order_ID=?, product_ID=?, quantity=?";
            $stmt = $db->prepare($query);
            
            $order_id = htmlspecialchars(strip_tags($data->order_ID));
            $product_id = htmlspecialchars(strip_tags($data->product_ID));
            $quantity = htmlspecialchars(strip_tags($data->quantity));

            $stmt->bind_param("iii", $order_id, $product_id, $quantity);

            if($stmt->execute()) {
                http_response_code(201);
                echo json_encode(array("message" => "Order detail created.", "id" => $db->insert_id));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create order detail."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to create order detail. Data is incomplete."));
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $id = isset($_GET['id']) ? $_GET['id'] : (isset($data->ID) ? $data->ID : null);
        
        if(!empty($id)) {
            $query = "DELETE FROM order_details WHERE ID = ?";
            $stmt = $db->prepare($query);
            $id = htmlspecialchars(strip_tags($id));
            $stmt->bind_param("i", $id);

            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "Order detail deleted."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to delete order detail."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to delete order detail. ID is missing."));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;
}
?>
