<?php
require_once __DIR__.'/../vendor/autoload.php';
use myapi\Update\ProductsUpdate;

header('Content-Type: application/json');

try {
    // Obtener datos del POST
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    // Validación básica
    if (!$data || !isset($data->id)) {
        throw new Exception("Datos incompletos para la actualización");
    }

    $productos = new ProductsUpdate();
    $result = $productos->edit($data);

    echo json_encode($result, JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}
?>