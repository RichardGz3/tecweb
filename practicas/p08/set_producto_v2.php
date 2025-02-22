<?php
$nombre   = trim($_POST['nombre'] ?? '');
$marca    = trim($_POST['marca'] ?? '');
$modelo   = trim($_POST['modelo'] ?? '');
$precio   = floatval($_POST['precio'] ?? 0);
$detalles = trim($_POST['detalles'] ?? '');
$unidades = intval($_POST['unidades'] ?? 0);
$imagen   = $_FILES['imagen']['name'] ?? '';

/** Ruta de imagen por defecto */
$ruta_imagen = 'img/imagen.png';

/** Validación de datos */
if (empty($nombre) || empty($marca) || empty($modelo)) {
    die('<h3 style="color:red;">Error: Todos los campos obligatorios deben ser llenados.</h3>');
}

/** Conexión con la base de datos */
$link = new mysqli('localhost', 'root', 'LGomr05RicML', 'marketzone');

if ($link->connect_errno) {
    die('<h3 style="color:red;">Error de conexión: ' . $link->connect_error . '</h3>');
}

/** Verificar si el producto ya existe */
$sql_check = "SELECT id FROM productos WHERE nombre = ? AND marca = ? AND modelo = ?";
$stmt = $link->prepare($sql_check);
$stmt->bind_param("sss", $nombre, $marca, $modelo);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->close();
    die('<h3 style="color:red;">Error: El producto ya existe en la base de datos.</h3>');
}

$stmt->close();

/** Subir imagen si se proporciona */
if (!empty($_FILES['imagen']['tmp_name'])) {
    $directorio = 'img/';
    
    /** Crear la carpeta si no existe */
    if (!is_dir($directorio)) {
        mkdir($directorio, 0777, true);
    }
    
    $ruta_imagen = $directorio . basename($_FILES['imagen']['name']);
    
    if (!move_uploaded_file($_FILES['imagen']['tmp_name'], $ruta_imagen)) {
        $ruta_imagen = 'imagenes/imagen.png'; // Si hay error, usar imagen por defecto
    }
}

/** Insertar producto en la base de datos */
$sql_insert = "INSERT INTO productos (nombre, marca, modelo, precio, detalles, unidades, imagen, eliminado) 
               VALUES (?, ?, ?, ?, ?, ?, ?, 0)";
$stmt = $link->prepare($sql_insert);
$stmt->bind_param("sssdsis", $nombre, $marca, $modelo, $precio, $detalles, $unidades, $ruta_imagen);

if ($stmt->execute()) {
    mostrarResumen($nombre, $marca, $modelo, $precio, $detalles, $unidades, $ruta_imagen);
} else {
    mostrarMensaje("Error: No se pudo registrar el producto.");
}

$stmt->close();
$link->close();

/** Función para mostrar un mensaje de error */
function mostrarMensaje($mensaje) {
    echo "<h3 style='color:red;'>$mensaje</h3>";
}

/** Función para mostrar el resumen del producto */
function mostrarResumen($nombre, $marca, $modelo, $precio, $detalles, $unidades, $imagen) {
    echo "<h2>Producto Insertado Correctamente</h2>";
    echo "<ul>";
    echo "<li><strong>Nombre:</strong> $nombre</li>";
    echo "<li><strong>Marca:</strong> $marca</li>";
    echo "<li><strong>Modelo:</strong> $modelo</li>";
    echo "<li><strong>Precio:</strong> $precio</li>";
    echo "<li><strong>Detalles:</strong> $detalles</li>";
    echo "<li><strong>Unidades:</strong> $unidades</li>";
    echo "<li><strong>Imagen:</strong><br><img src='$imagen' width='150' alt='Imagen del producto'></li>";
    echo "</ul>";
}
?>

