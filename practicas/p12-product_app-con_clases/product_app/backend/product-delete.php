<?php
require_once __DIR__ . '/../vendor/autoload.php';

use TECWEB\MYAPI\Delete\ProductsDelete;

$id = $_POST['id'] ?? null;
$productos = new ProductsDelete('marketzone');
$result = $productos->delete($id);

header('Content-Type: application/json');
echo json_encode($result, JSON_PRETTY_PRINT);
?>