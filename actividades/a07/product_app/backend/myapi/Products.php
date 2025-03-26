<?php
namespace MyAPI;

require_once 'DataBase.php';

class Products extends DataBase {
    protected $response = [];

    public function __construct(string $dbname, string $host = 'localhost', string $user = 'root', string $password = 'LGomr05RicML') {
        parent::__construct($host, $user, $password, $dbname);
        $this->response = ['status' => '', 'message' => ''];
    }

    public function add($producto) {
        $jsonOBJ = json_decode($producto);
        
        $sql = "SELECT * FROM productos WHERE nombre = '{$jsonOBJ->nombre}' AND eliminado = 0";
        $result = $this->conexion->query($sql);
        
        if ($result->num_rows == 0) {
            $this->conexion->set_charset("utf8");
            $sql = "INSERT INTO productos VALUES (null, '{$jsonOBJ->nombre}', '{$jsonOBJ->marca}', '{$jsonOBJ->modelo}', {$jsonOBJ->precio}, '{$jsonOBJ->detalles}', {$jsonOBJ->unidades}, '{$jsonOBJ->imagen}', 0)";
            
            if($this->conexion->query($sql)){
                $this->response['status'] = "success";
                $this->response['message'] = "Producto agregado";
            } else {
                $this->response['message'] = "ERROR: No se ejecutó $sql. " . mysqli_error($this->conexion);
            }
        } else {
            $this->response['message'] = "Ya existe un producto con ese nombre";
        }

        $result->free();
        return $this;
    }

    public function edit($producto) {
        $jsonOBJ = json_decode($producto);

        if (isset($jsonOBJ->id)) {
            $sql = "UPDATE productos SET 
                    nombre = '{$jsonOBJ->nombre}', 
                    marca = '{$jsonOBJ->marca}', 
                    modelo = '{$jsonOBJ->modelo}', 
                    precio = {$jsonOBJ->precio}, 
                    detalles = '{$jsonOBJ->detalles}', 
                    unidades = {$jsonOBJ->unidades}, 
                    imagen = '{$jsonOBJ->imagen}' 
                    WHERE id = {$jsonOBJ->id}";

            if ($this->conexion->query($sql)) {
                $this->response['status'] = "success";
                $this->response['message'] = "Producto actualizado correctamente.";
            } else {
                $this->response['message'] = "ERROR: No se ejecutó $sql. " . mysqli_error($this->conexion);
            }
        } else {
            $this->response['message'] = "El ID del producto no está definido.";
        }

        return $this;
    }

    public function delete($id) {
        // Validar que el ID sea numérico
        if (!is_numeric($id)) {
            $this->response = [
                'status' => 'error',
                'message' => 'ID inválido'
            ];
            return $this;
        }
    
        // Primero verificar si el producto existe
        $checkSql = "SELECT id FROM productos WHERE id = {$id} AND eliminado = 0";
        $checkResult = $this->conexion->query($checkSql);
    
        if ($checkResult->num_rows > 0) {
            $sql = "UPDATE productos SET eliminado = 1 WHERE id = {$id}";
            
            if ($this->conexion->query($sql)) {
                $this->response = [
                    'status' => 'success',
                    'message' => 'Producto eliminado'
                ];
            } else {
                $this->response = [
                    'status' => 'error',
                    'message' => 'ERROR: No se pudo eliminar el producto. ' . mysqli_error($this->conexion)
                ];
            }
        } else {
            $this->response = [
                'status' => 'error',
                'message' => 'El producto no existe o ya fue eliminado'
            ];
        }
    
        $checkResult->free();
        return $this;
    }

    public function get($id) {
        $sql = "SELECT * FROM productos WHERE id = {$id} AND eliminado = 0";
        $result = $this->conexion->query($sql);

        if ($result) {
            $row = $result->fetch_assoc();

            if(!is_null($row)) {
                foreach($row as $key => $value) {
                    $this->response[$key] = utf8_encode($value);
                }
            }
            $result->free();
        } else {
            $this->response = ['error' => 'Query Error: '.mysqli_error($this->conexion)];
        }

        return $this;
    }

    public function getList() {
        $sql = "SELECT * FROM productos WHERE eliminado = 0";
        $result = $this->conexion->query($sql);

        if ($result) {
            $rows = $result->fetch_all(MYSQLI_ASSOC);

            if(!is_null($rows)) {
                foreach($rows as $num => $row) {
                    foreach($row as $key => $value) {
                        $this->response[$num][$key] = utf8_encode($value);
                    }
                }
            }
            $result->free();
        } else {
            $this->response = ['error' => 'Query Error: '.mysqli_error($this->conexion)];
        }

        return $this;
    }

    public function search($search) {
        $sql = "SELECT * FROM productos WHERE (id = '{$search}' OR nombre LIKE '%{$search}%' OR marca LIKE '%{$search}%' OR detalles LIKE '%{$search}%') AND eliminado = 0";
        $result = $this->conexion->query($sql);

        if ($result) {
            $rows = $result->fetch_all(MYSQLI_ASSOC);

            if(!is_null($rows)) {
                foreach($rows as $num => $row) {
                    foreach($row as $key => $value) {
                        $this->response[$num][$key] = utf8_encode($value);
                    }
                }
            }
            $result->free();
        } else {
            $this->response = ['error' => 'Query Error: '.mysqli_error($this->conexion)];
        }

        return $this;
    }

    public function singleByName($name) {
        $sql = "SELECT * FROM productos WHERE nombre = '{$name}' AND eliminado = 0";
        $result = $this->conexion->query($sql);

        if ($result) {
            $row = $result->fetch_assoc();

            if(!is_null($row)) {
                foreach($row as $key => $value) {
                    $this->response[$key] = utf8_encode($value);
                }
            }
            $result->free();
        } else {
            $this->response = ['error' => 'Query Error: '.mysqli_error($this->conexion)];
        }

        return $this;
    }

    public function getData() {
        return json_encode($this->response, JSON_PRETTY_PRINT);
    }

    public function __destruct() {
        $this->conexion->close();
    }
}
?>
