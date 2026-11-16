<?php
class Database {
    
    private $host;
    private $db_name;
    private $username;
    private $password;

    public $conn;

    public function __construct() {
        $this->host = getenv('DB_HOST') ?: 'localhost';
        $this->db_name = getenv('DB_NAME') ?: 'dental_store';
        $this->username = getenv('DB_USER') ?: 'root';
        $this->password = getenv('DB_PASSWORD') ?: '';
    }
    
    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);
            if ($this->conn->connect_error) {
                throw new Exception("Connection failed: " . $this->conn->connect_error);
            }
            $this->conn->set_charset("utf8");
        } catch(Exception $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }

    public function getServerConnection() {
        $conn = null;
        try {
            $conn = new mysqli($this->host, $this->username, $this->password);
            if ($conn->connect_error) {
                throw new Exception("Connection failed: " . $conn->connect_error);
            }
        } catch(Exception $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $conn;
    }
    
    public function getDbName() {
        return $this->db_name;
    }
}
?>