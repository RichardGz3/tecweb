<?php
    /*include_once __DIR__.'/database.php';

    // SE CREA EL ARREGLO QUE SE VA A DEVOLVER EN FORMA DE JSON
    $data = array(
        'status'  => 'error',
        'message' => 'La consulta falló'
    );
    // SE VERIFICA HABER RECIBIDO EL ID
    if( isset($_GET['id']) ) {
        $id = $_GET['id'];
        // SE REALIZA LA QUERY DE BÚSQUEDA Y AL MISMO TIEMPO SE VALIDA SI HUBO RESULTADOS
        $sql = "UPDATE productos SET eliminado=1 WHERE id = {$id}";
        if ( $conexion->query($sql) ) {
            $data['status'] =  "success";
            $data['message'] =  "Producto eliminado";
		} else {
            $data['message'] = "ERROR: No se ejecuto $sql. " . mysqli_error($conexion);
        }
		$conexion->close();
    } 
    
    // SE HACE LA CONVERSIÓN DE ARRAY A JSON
    echo json_encode($data, JSON_PRETTY_PRINT);*/

    include_once __DIR__ . '/myapi/Products.php';

    // Verificar si se recibió el ID
    if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
        echo json_encode([
            'status' => 'error',
            'message' => 'ID no proporcionado o inválido'
        ]);
        exit;
    }

    $id = (int)$_GET['id'];

    try {
        // Crear instancia y eliminar producto
        $product = new MyAPI\Products("marketzone");
        $product->delete($id);
        
        // Devolver respuesta JSON
        header('Content-Type: application/json');
        echo $product->getData();
    } catch (Exception $e) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Error en el servidor: ' . $e->getMessage()
        ]);
    }

?>