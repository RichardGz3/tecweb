<?php
namespace myapi\Read;

use myapi\DataBase;

class ProductsRead extends DataBase {
    public function list() {
        $response = [
            'status' => 'error',
            'message' => 'La consulta falló',
            'data' => []
        ];

        $sql = "SELECT * FROM productos WHERE eliminado = 0";
        if($result = $this->conexion->query($sql)) {
            $response['status'] = "success";
            $response['message'] = "Productos obtenidos";
            $response['data'] = $result->fetch_all(MYSQLI_ASSOC);
            $result->free();
        } else {
            $response['message'] = "ERROR: No se ejecutó $sql. " . mysqli_error($this->conexion);
        }
        $this->conexion->close();
        return $response;
    }

    public function search($search) {
        $response = [
            'status' => 'error',
            'message' => 'La consulta falló',
            'data' => []
        ];

        if(isset($search)) {
            $search = $this->conexion->real_escape_string($search);
            $sql = "SELECT * FROM productos WHERE 
                   (id = '$search' OR 
                   nombre LIKE '%$search%' OR 
                   marca LIKE '%$search%' OR 
                   detalles LIKE '%$search%') 
                   AND eliminado = 0";

            if($result = $this->conexion->query($sql)) {
                $response['status'] = "success";
                $response['message'] = "Búsqueda completada";
                $response['data'] = $result->fetch_all(MYSQLI_ASSOC);
                $result->free();
            } else {
                $response['message'] = "ERROR: No se ejecutó $sql. " . mysqli_error($this->conexion);
            }
        }
        $this->conexion->close();
        return $response;
    }
}
?>