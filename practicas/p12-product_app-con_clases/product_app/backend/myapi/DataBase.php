<?php
namespace myapi;

abstract class DataBase {
    protected $conexion;

    public function __construct($databaseName = 'marketzone') {
        $config = [
            'host' => 'localhost',
            'user' => 'root',
            'pass' => 'LGomr05RicML',
            'db' => $databaseName,
        ];

        $this->conexion = new \mysqli(
            $config['host'],
            $config['user'],
            $config['pass'],
            $config['db']
        );

        if ($this->conexion->connect_error) {
            $this->handleConnectionError($config);
        }

        $this->conexion->set_charset("utf8mb4");
        $this->conexion->options(MYSQLI_OPT_CONNECT_TIMEOUT, 5);
    }

    protected function handleConnectionError($config) {
        $error = [
            'code' => $this->conexion->connect_errno,
            'message' => $this->conexion->connect_error,
            'config' => $config
        ];
        
        error_log("Database connection failed: " . print_r($error, true));
        
        header('Content-Type: application/json');
        die(json_encode([
            'status' => 'error',
            'message' => 'Database connection failed',
            'error_details' => $error
        ]));
    }

    protected function query($sql) {
        $result = $this->conexion->query($sql);
        
        if (!$result) {
            $this->handleQueryError($sql);
        }
        
        return $result;
    }

    protected function handleQueryError($sql) {
        $error = [
            'code' => $this->conexion->errno,
            'message' => $this->conexion->error,
            'sql' => $sql
        ];
        
        error_log("Query failed: " . print_r($error, true));
        
        header('Content-Type: application/json');
        die(json_encode([
            'status' => 'error',
            'message' => 'Database query failed',
            'error_details' => $error
        ]));
    }
}
?>