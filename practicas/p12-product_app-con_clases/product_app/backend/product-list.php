<?php
require_once __DIR__ . '/../vendor/autoload.php';

use TECWEB\MYAPI\Read\ProductsRead;

$productos = new ProductsRead('marketzone');
$result = $productos->list();

header('Content-Type: application/json');
echo json_encode($result, JSON_PRETTY_PRINT);
?>