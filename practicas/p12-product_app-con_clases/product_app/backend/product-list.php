<?php
require_once __DIR__.'/../vendor/autoload.php';
use myapi\DataBase;

// 1. Creamos una clase concreta temporal
final class ProductListHandler extends DataBase {
    public function getProducts() {
        $query = "SELECT id, nombre, precio, unidades, marca, modelo, detalles, imagen 
                 FROM productos 
                 WHERE eliminado = 0";
        
        $result = $this->conexion->query($query);
        
        if (!$result) {
            throw new Exception("Error en consulta: " . $this->conexion->error);
        }
        
        $products = [];
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        
        return $products;
    }
}

// 2. Headers para JSON
header('Content-Type: application/json');

try {
    // 3. Usamos la clase concreta
    $handler = new ProductListHandler();
    $products = $handler->getProducts();
    
    echo json_encode([
        'status' => 'success',
        'data' => $products,
        'count' => count($products)
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>