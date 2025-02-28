<?php
// Conexión a la base de datos
$link = new mysqli('localhost', 'root', 'LGomr05RicML', 'marketzone');

// Chequea la conexión
if ($link->connect_errno) {
    die('Falló la conexión: ' . $link->connect_error);
}

// Verificar si se recibe el id
if (isset($_POST['id'])) {
    $id = $_POST['id'];

    // Verificar si el producto existe
    $result = $link->query("SELECT * FROM productos WHERE id = $id");
    if ($result->num_rows > 0) {
        // El producto existe, proceder con la actualización
        $nombre = $_POST['nombre'];
        $marca = $_POST['marca'];
        $modelo = $_POST['modelo'];
        $precio = $_POST['precio'];
        $unidades = $_POST['unidades'];
        $detalles = $_POST['detalles'];

        // Manejo de la imagen
        if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] == 0) {
            // Definir el directorio donde se guardarán las imágenes
            $directorio = 'img/';  // Puedes cambiarlo si es necesario
            $imagenTmp = $_FILES['imagen']['tmp_name'];
            $imagenNombre = $_FILES['imagen']['name'];

            // Asegurarse de que la imagen se guarde correctamente con un nombre único
            $imagenFinal = $directorio . uniqid() . '-' . $imagenNombre;

            // Mover la imagen al directorio de destino
            if (move_uploaded_file($imagenTmp, $imagenFinal)) {
                $imagen = $imagenFinal; // Se usará esta ruta en la base de datos
            } else {
                echo "Error al subir la imagen.";
                exit;
            }
        } else {
            // Si no se sube una nueva imagen, mantener la imagen actual
            $producto = $result->fetch_assoc();
            $imagen = $producto['imagen'];
        }

        // Actualizar el producto en la base de datos
        $updateQuery = "UPDATE productos SET nombre = '$nombre', marca = '$marca', modelo = '$modelo', precio = '$precio', unidades = '$unidades', detalles = '$detalles', imagen = '$imagen' WHERE id = $id";
        if ($link->query($updateQuery) === TRUE) {
            echo "Producto actualizado exitosamente.";
        } else {
            echo "Error al actualizar el producto: " . $link->error;
        }
    } else {
        // Producto no encontrado
        echo "El producto no existe.";
    }
} else {
    echo "No se recibió el ID del producto.";
}

if ($link->query($updateQuery) === TRUE) {
    echo "Producto actualizado exitosamente.<br>";
    echo "<a href='get_productos_xhtml_v2.php'>Ver productos</a><br>";
    echo "<a href='get_productos_vigentes_v2.php'>Ver productos vigentes</a>";
} else {
    echo "Error al actualizar el producto: " . $link->error . "<br>";
    echo "<a href='get_productos_xhtml_v2.php'>Ver productos</a><br>";
    echo "<a href='get_productos_vigentes_v2.php'>Ver productos vigentes</a>";
}

$link->close();
?>
