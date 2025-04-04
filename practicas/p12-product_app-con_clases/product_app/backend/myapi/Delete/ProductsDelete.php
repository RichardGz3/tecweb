<?php
namespace myapi\Delete;

use myapi\DataBase;

class ProductsDelete extends DataBase {
    public function delete($id) {
        $response = [
            'status' => 'error',
            'message' => 'La consulta falló'
        ];

        if(isset($id)) {
            $sql = "UPDATE productos SET eliminado = 1 WHERE id = {$id}";
            if ($this->conexion->query($sql)) {
                $response['status'] = "success";
                $response['message'] = "Producto eliminado";
            } else {
                $response['message'] = "ERROR: No se ejecutó $sql. " . mysqli_error($this->conexion);
            }
        }
        $this->conexion->close();
        return $response;
    }
}
?>