<?php
require_once __DIR__ . '/../vendor/autoload.php';

use TECWEB\MYAPI\Create\ProductsCreate;

$json = json_decode(file_get_contents('php://input'));
$productos = new ProductsCreate('marketzone');
$result = $productos->add($json);

header('Content-Type: application/json');
echo json_encode($result, JSON_PRETTY_PRINT);
?>