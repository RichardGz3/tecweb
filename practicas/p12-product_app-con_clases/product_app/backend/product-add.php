<?php
require_once __DIR__.'/../vendor/autoload.php';

use myapi\Create\ProductsCreate;

header('Content-Type: application/json');

// Validación básica
if (empty($_POST['nombre']) || !isset($_POST['precio']) || !is_numeric($_POST['precio'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Nombre y precio son requeridos'
    ]);
    exit;
}

$productos = new ProductsCreate('marketzone');
$result = $productos->add((object)$_POST); // Convertir array a objeto

echo json_encode($result, JSON_PRETTY_PRINT);
?>