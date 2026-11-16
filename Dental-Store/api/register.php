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
$db = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->Username) && !empty($data->Email) && !empty($data->Password)) {
        
        
        $check_query = "SELECT UserID FROM Users WHERE Username = :username OR Email = :email";
        $check_stmt = $db->prepare($check_query);
        $username = htmlspecialchars(strip_tags($data->Username));
        $email = htmlspecialchars(strip_tags($data->Email));
        $check_stmt->bindParam(":username", $username);
        $check_stmt->bindParam(":email", $email);
        $check_stmt->execute();

        if ($check_stmt->rowCount() > 0) {
            http_response_code(400);
            echo json_encode(array("message" => "Username or Email already exists."));
            exit();
        }

        
        $query = "INSERT INTO Users SET Username=:username, Email=:email, PasswordHash=:password";
        $stmt = $db->prepare($query);

        
        $password_hash = password_hash($data->Password, PASSWORD_BCRYPT);

        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":password", $password_hash);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(array(
                "message" => "User registered successfully.",
                "user_id" => $db->lastInsertId()
            ));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to register user. Database error."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to register. Incomplete data."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?>
