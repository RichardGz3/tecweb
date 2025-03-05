<?php
    include_once __DIR__.'/database.php';

    // Leer el JSON enviado desde el cliente
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);
    
    // Verificar que se recibieron los datos requeridos
    if (!isset($data['nombre']) || !isset($data['marca']) || !isset($data['modelo']) || !isset($data['detalles'])) {
        echo json_encode(["mensaje" => "Faltan datos obligatorios."]);
        exit;
    }

    $nombre = $conexion->real_escape_string($data['nombre']);
    $marca = $conexion->real_escape_string($data['marca']);
    $modelo = $conexion->real_escape_string($data['modelo']);
    $detalles = $conexion->real_escape_string($data['detalles']);

    // Validar si el producto ya existe con la combinación (nombre + marca) o (marca + modelo)
    $queryVerificar = "SELECT id FROM productos 
                       WHERE eliminado = 0 AND 
                            ((nombre = '$nombre' AND marca = '$marca') 
                            OR (marca = '$marca' AND modelo = '$modelo'))";

    $resultado = $conexion->query($queryVerificar);

    if ($resultado->num_rows > 0) {
        echo json_encode(["mensaje" => "El producto ya existe."]);
    } else {
        // Insertar nuevo producto
        $queryInsertar = "INSERT INTO productos (nombre, marca, modelo, detalles, eliminado) 
                          VALUES ('$nombre', '$marca', '$modelo', '$detalles', 0)";
        
        if ($conexion->query($queryInsertar)) {
            echo json_encode(["mensaje" => "Producto agregado con éxito."]);
        } else {
            echo json_encode(["mensaje" => "Error al agregar el producto."]);
        }
    }

    $conexion->close();
?>
