<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'config/database.php';

$database = new Database();
$db = $database->getServerConnection();
$dbName = $database->getDbName();
$db->select_db($dbName);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->password)) {
    $username = $data->username;
    $password = $data->password;

    $query = "SELECT admin_id, username, password_hash FROM admins WHERE username = ?";
    $stmt = $db->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $password_hash = $row['password_hash'];

        if (password_verify($password, $password_hash)) {
            http_response_code(200);
            echo json_encode(array("message" => "Login successful.", "admin_id" => $row['admin_id']));
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Login failed. Incorrect password."));
        }
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Login failed. Admin not found."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data. Please provide username and password."));
}
?>
