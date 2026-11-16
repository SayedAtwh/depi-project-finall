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
            $query = "SELECT o.order_ID, o.Customer_ID, o.order_date, c.Name as Customer_Name, c.Phone_num, c.address 
                      FROM orders o 
                      LEFT JOIN Customers c ON o.Customer_ID = c.ID 
                      WHERE o.order_ID = ? LIMIT 1";
            $stmt = $db->prepare($query);
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            if($row) {
                
                $detail_query = "SELECT od.ID, od.product_ID, od.quantity, p.Name as Product_Name, p.price 
                                 FROM order_details od
                                 LEFT JOIN Products p ON od.product_ID = p.Product_ID
                                 WHERE od.order_ID = ?";
                $detail_stmt = $db->prepare($detail_query);
                $detail_stmt->bind_param("i", $id);
                $detail_stmt->execute();
                $detail_res = $detail_stmt->get_result();
                
                $details = array();
                while ($detail_row = $detail_res->fetch_assoc()) {
                    $detail_row['quantity'] = (int)$detail_row['quantity'];
                    $detail_row['price'] = (float)$detail_row['price'];
                    array_push($details, $detail_row);
                }
                $row['details'] = $details;
                
                http_response_code(200);
                echo json_encode($row);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Order not found."));
            }
        } else {
            $query = "SELECT o.order_ID, o.Customer_ID, o.order_date, c.Name as Customer_Name 
                      FROM orders o 
                      LEFT JOIN Customers c ON o.Customer_ID = c.ID 
                      ORDER BY o.order_ID DESC";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $result = $stmt->get_result();
            $num = $result->num_rows;
            if($num > 0) {
                $orders_arr = array();
                while ($row = $result->fetch_assoc()) {
                    array_push($orders_arr, $row);
                }
                http_response_code(200);
                echo json_encode($orders_arr);
            } else {
                http_response_code(200);
                echo json_encode(array());
            }
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        if(!empty($data->Customer_ID)) {
            try {
                $db->begin_transaction();

                $query = "INSERT INTO orders SET Customer_ID=?";
                $stmt = $db->prepare($query);
                $customer_id = htmlspecialchars(strip_tags($data->Customer_ID));
                $stmt->bind_param("i", $customer_id);
                $stmt->execute();
                
                $order_id = $db->insert_id;

                
                if(!empty($data->details) && is_array($data->details)) {
                    $detail_query = "INSERT INTO order_details SET order_ID=?, product_ID=?, quantity=?";
                    $detail_stmt = $db->prepare($detail_query);

                    foreach($data->details as $detail) {
                        $p_id = htmlspecialchars(strip_tags($detail->product_ID));
                        $qty = htmlspecialchars(strip_tags($detail->quantity));
                        
                        $detail_stmt->bind_param("iii", $order_id, $p_id, $qty);
                        $detail_stmt->execute();
                    }
                }

                $db->commit();
                http_response_code(201);
                echo json_encode(array("message" => "Order created.", "order_ID" => $order_id));
            } catch (Exception $e) {
                $db->rollback();
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create order. " . $e->getMessage()));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to create order. Data is incomplete."));
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $id = isset($_GET['id']) ? $_GET['id'] : (isset($data->order_ID) ? $data->order_ID : null);
        
        if(!empty($id)) {
            
            $query = "DELETE FROM orders WHERE order_ID = ?";
            $stmt = $db->prepare($query);
            $id = htmlspecialchars(strip_tags($id));
            $stmt->bind_param("i", $id);

            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "Order deleted."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to delete order."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to delete order. ID is missing."));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;
}
?>
