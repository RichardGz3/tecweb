<?php
namespace myapi\Create;

use myapi\DataBase;

class ProductsCreate extends DataBase {
    public function add($productData) {
        $response = [
            'status' => 'error',
            'message' => 'La consulta falló'
        ];

        if(isset($productData->nombre)) {
            $nombre = $this->conexion->real_escape_string($productData->nombre);
            $precio = floatval($productData->precio);
            $unidades = intval($productData->unidades ?? 1);
            $marca = $this->conexion->real_escape_string($productData->marca ?? 'NA');
            $modelo = $this->conexion->real_escape_string($productData->modelo ?? 'XX-000');
            $detalles = $this->conexion->real_escape_string($productData->detalles ?? 'NA');
            $imagen = $this->conexion->real_escape_string($productData->imagen ?? 'img/default.png');

            $sql = "INSERT INTO productos VALUES (null, '$nombre', '$marca', '$modelo', $precio, '$detalles', $unidades, '$imagen', 0)";
            
            if($this->conexion->query($sql)) {
                $response['status'] = "success";
                $response['message'] = "Producto agregado";
                $response['id'] = $this->conexion->insert_id;
            } else {
                $response['message'] = "ERROR: No se ejecutó $sql. " . mysqli_error($this->conexion);
            }
        }
        $this->conexion->close();
        return $response;
    }
}
?>