<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title><?= isset($_GET['id']) ? 'Editar Producto' : 'Agregar Producto' ?></title>
    <style>
        ol, ul { list-style-type: none; }
        #imagenDefault {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border: 1px solid #ccc;
            display: block;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <h1><?= isset($_GET['id']) ? 'Editar Producto' : 'Agregar Producto' ?></h1>
    
    <?php
    // Conexión a la base de datos
    $link = new mysqli('localhost', 'root', 'LGomr05RicML', 'marketzone');

    // Chequea conexión
    if ($link->connect_errno) {
        die('Falló la conexión: ' . $link->connect_error);
    }

    // Inicializa la variable $producto
    $producto = [
        'id' => '',
        'nombre' => '',
        'marca' => '',
        'modelo' => '',
        'precio' => '',
        'unidades' => '',
        'detalles' => '',
        'imagen' => 'src/cat.png' // Imagen por defecto
    ];

    // Si se proporciona un ID, obtén los datos del producto
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        // Consulta para obtener los datos del producto
        if ($result = $link->query("SELECT * FROM productos WHERE id = $id")) {
            $producto = $result->fetch_assoc();
            $result->free();
        } else {
            die('Error al obtener los datos del producto.');
        }
    }

    $link->close();
    ?>

    <form id="formularioProductos" action="update_producto.php" method="post" enctype="multipart/form-data">
        <?php if (isset($_GET['id'])) : ?>
            <input type="hidden" name="id" value="<?= $producto['id'] ?>">
        <?php endif; ?>
        <fieldset>
            <legend>Información del Producto</legend>
            <ul>
                <li>
                    <label for="nombre">Nombre del Producto:</label>
                    <input type="text" name="nombre" id="nombre" value="<?= $producto['nombre'] ?>" required>
                </li>
                <li>
                    <label for="marca">Marca:</label>
                    <select name="marca" id="marca" required>
                        <option value="Apple" <?= $producto['marca'] == 'Apple' ? 'selected' : '' ?>>Apple</option>
                        <option value="Samsung" <?= $producto['marca'] == 'Samsung' ? 'selected' : '' ?>>Samsung</option>
                        <option value="Sony" <?= $producto['marca'] == 'Sony' ? 'selected' : '' ?>>Sony</option>
                        <option value="Xiaomi" <?= $producto['marca'] == 'Xiaomi' ? 'selected' : '' ?>>Xiaomi</option>
                        <option value="Otro" <?= $producto['marca'] == 'Otro' ? 'selected' : '' ?>>Otro</option>
                    </select>
                </li>
                <li>
                    <label for="modelo">Modelo:</label>
                    <input type="text" name="modelo" id="modelo" value="<?= $producto['modelo'] ?>" required>
                </li>
                <li>
                    <label for="precio">Precio:</label>
                    <input type="number" name="precio" id="precio" step="0.01" value="<?= $producto['precio'] ?>" required>
                </li>
                <li>
                    <label for="detalles">Detalles:</label><br>
                    <textarea name="detalles" rows="4" cols="60" id="detalles"><?= $producto['detalles'] ?></textarea>
                </li>
                <li>
                    <label for="unidades">Unidades en Stock:</label>
                    <input type="number" name="unidades" id="unidades" value="<?= $producto['unidades'] ?>" required>
                </li>
                <li>
                    <label for="imagen">Imagen del Producto:</label>
                    <input type="file" name="imagen" id="imagen" accept="image/*">
                    <img id="imagenDefault" src="<?= $producto['imagen'] ?>" alt="Imagen del producto">
                </li>
            </ul>
        </fieldset>
    
        <p>
            <input type="submit" value="Actualizar Producto">
            <input type="reset" value="Limpiar Formulario">
        </p>
    </form>

    <script src="validaciones.js"></script>
</body>
</html>
