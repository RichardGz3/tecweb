<?php
    include_once __DIR__.'/database.php';

    // SE CREA EL ARREGLO QUE SE VA A DEVOLVER EN FORMA DE JSON
    $data = array();

    // SE VERIFICA QUE SE HAYA RECIBIDO EL PARÁMETRO 'busqueda'
    if( isset($_POST['busqueda']) ) {
        $busqueda = $conexion->real_escape_string($_POST['busqueda']); // Evita inyección SQL

        // SE REALIZA LA QUERY DE BÚSQUEDA UTILIZANDO LIKE EN VARIOS CAMPOS
        $query = "SELECT * FROM productos 
                  WHERE nombre LIKE '%$busqueda%' 
                     OR marca LIKE '%$busqueda%' 
                     OR detalles LIKE '%$busqueda%'";

        if ($result = $conexion->query($query)) {
            // SE OBTIENEN LOS RESULTADOS
            while ($row = $result->fetch_assoc()) {
                // SE AGREGA CADA FILA AL ARREGLO DE RESPUESTA
                $data[] = $row;
            }
            $result->free();
        } else {
            die('Query Error: '.mysqli_error($conexion));
        }
        $conexion->close();
    } 

    // SE HACE LA CONVERSIÓN DE ARRAY A JSON
    echo json_encode($data, JSON_PRETTY_PRINT);
?>
