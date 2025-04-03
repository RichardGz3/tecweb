<?php
require_once __DIR__ . '/../vendor/autoload.php';

use TECWEB\MYAPI\Update\ProductsUpdate;

$json = json_decode(file_get_contents('php://input'));
$productos = new ProductsUpdate('marketzone');
$result = $productos->edit($json);

header('Content-Type: application/json');
echo json_encode($result, JSON_PRETTY_PRINT);
?>