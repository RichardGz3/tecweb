<?php
namespace myapi\Update;

use myapi\DataBase;

class ProductsUpdate extends DataBase {
    public function edit($productData) {
        if (!isset($productData->id)) {
            return [
                'status' => 'error',
                'message' => 'ID de producto no especificado'
            ];
        }

        try {
            $id = (int)$productData->id;
            $nombre = $this->conexion->real_escape_string($productData->nombre ?? '');
            $precio = (float)($productData->precio ?? 0);
            $unidades = (int)($productData->unidades ?? 1);
            $marca = $this->conexion->real_escape_string($productData->marca ?? 'NA');
            $modelo = $this->conexion->real_escape_string($productData->modelo ?? 'XX-000');
            $detalles = $this->conexion->real_escape_string($productData->detalles ?? 'NA');
            $imagen = $this->conexion->real_escape_string($productData->imagen ?? 'img/default.png');

            $sql = "UPDATE productos SET 
                    nombre = ?, 
                    precio = ?, 
                    unidades = ?, 
                    marca = ?, 
                    modelo = ?, 
                    detalles = ?, 
                    imagen = ? 
                    WHERE id = ?";

            $stmt = $this->conexion->prepare($sql);
            
            if (!$stmt) {
                throw new \Exception("Error al preparar la consulta: " . $this->conexion->error);
            }

            $stmt->bind_param(
                "sdissssi", 
                $nombre,
                $precio,
                $unidades,
                $marca,
                $modelo,
                $detalles,
                $imagen,
                $id
            );

            if (!$stmt->execute()) {
                throw new \Exception("Error al ejecutar la consulta: " . $stmt->error);
            }

            if ($stmt->affected_rows === 0) {
                return [
                    'status' => 'warning',
                    'message' => 'No se realizaron cambios. ¿El producto existe?'
                ];
            }

            return [
                'status' => 'success',
                'message' => 'Producto actualizado correctamente',
                'affected_rows' => $stmt->affected_rows
            ];

        } catch (\Exception $e) {
            error_log("Error en ProductsUpdate: " . $e->getMessage());
            
            return [
                'status' => 'error',
                'message' => 'Error al actualizar el producto',
                'error_details' => $e->getMessage()
            ];
        } finally {
            if (isset($stmt)) {
                $stmt->close();
            }
        }
    }
}
?>