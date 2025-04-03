<?php
require_once __DIR__ . '/../vendor/autoload.php';

use TECWEB\MYAPI\Read\ProductsRead;

$search = $_GET['search'] ?? null;
$productos = new ProductsRead('marketzone');
$result = $productos->search($search);

header('Content-Type: application/json');
echo json_encode($result, JSON_PRETTY_PRINT);
?>