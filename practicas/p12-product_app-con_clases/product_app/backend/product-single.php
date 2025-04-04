<?php
require_once __DIR__.'/../vendor/autoload.php';
use myapi\DataBase;

header('Content-Type: application/json');

try {
    if (!isset($_POST['id'])) {
        throw new Exception("ID no proporcionado");
    }

    $productId = (int)$_POST['id'];
    if ($productId <= 0) {
        throw new Exception("ID inválido");
    }

    // Conexión usando tu clase DataBase
    $db = new class extends DataBase {};
    $conexion = $db->conexion;

    $stmt = $conexion->prepare("SELECT * FROM productos WHERE id = ?");
    $stmt->bind_param("i", $productId);
    $stmt->execute();
    
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        throw new Exception("Producto no encontrado");
    }

    $product = $result->fetch_assoc();
    
    echo json_encode([
        'status' => 'success',
        'data' => [
            'id' => $product['id'],
            'nombre' => $product['nombre'],
            'precio' => (float)$product['precio'],
            'unidades' => (int)$product['unidades'],
            'marca' => $product['marca'] ?? 'NA',
            'modelo' => $product['modelo'] ?? 'XX-000',
            'detalles' => $product['detalles'] ?? 'NA',
            'imagen' => $product['imagen'] ?? 'img/default.png'
        ]
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>