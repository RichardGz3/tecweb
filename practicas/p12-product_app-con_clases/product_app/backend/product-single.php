<?php
require_once __DIR__ . '/../vendor/autoload.php';

use TECWEB\MYAPI\Read\ProductsRead;

$id = $_POST['id'] ?? null;
$productos = new ProductsRead('marketzone');
$result = $productos->single($id);

header('Content-Type: application/json');
echo json_encode($result, JSON_PRETTY_PRINT);
?>