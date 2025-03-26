<?php
/*include_once __DIR__.'/database.php';

// SE OBTIENE LA INFORMACIÓN DEL PRODUCTO ENVIADA POR EL CLIENTE
$producto = file_get_contents('php://input');
$data = array(
    'status'  => 'error',
    'message' => 'No se pudo actualizar el producto'
);

if (!empty($producto)) {
    // SE TRANSFORMA EL STRING DEL JSON A OBJETO
    $jsonOBJ = json_decode($producto);

    // VERIFICAR QUE EL ID ESTÉ DEFINIDO
    if (isset($jsonOBJ->id)) {
        $sql = "UPDATE productos SET 
                nombre = '{$jsonOBJ->nombre}', 
                marca = '{$jsonOBJ->marca}', 
                modelo = '{$jsonOBJ->modelo}', 
                precio = {$jsonOBJ->precio}, 
                detalles = '{$jsonOBJ->detalles}', 
                unidades = {$jsonOBJ->unidades}, 
                imagen = '{$jsonOBJ->imagen}' 
                WHERE id = {$jsonOBJ->id}";

        if ($conexion->query($sql)) {
            $data['status'] = "success";
            $data['message'] = "Producto actualizado correctamente.";
        } else {
            $data['message'] = "ERROR: No se ejecutó $sql. " . mysqli_error($conexion);
        }
    } else {
        $data['message'] = "El ID del producto no está definido.";
    }
} else {
    $data['message'] = "No se recibieron datos del producto.";
}

// SE HACE LA CONVERSIÓN DE ARRAY A JSON
echo json_encode($data, JSON_PRETTY_PRINT);*/
    namespace MyAPI;
    require_once __DIR__.'./myapi/Products.php';

    $producto = file_get_contents('php://input');
    $products = new Products('marketzone');
    echo $products->edit($producto)->getData();              
?>