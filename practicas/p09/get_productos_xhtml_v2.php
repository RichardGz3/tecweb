<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">

<?php
if(isset($_GET['tope']))
    $tope = $_GET['tope'];
else
    die('<p>Parámetro "tope" no detectado...</p>');

if (!empty($tope))
{
    @$link = new mysqli('localhost', 'root', 'LGomr05RicML', 'marketzone');    

    if ($link->connect_errno) 
    {
        die('<p>Falló la conexión: '.$link->connect_error.'</p>');
    }

    if ($result = $link->query("SELECT * FROM productos WHERE unidades <= $tope")) 
    {
        $productos = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();
    }

    $link->close();
}
?>
<head>
    <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=UTF-8" />
    <title>Productos</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
</head>
<body>
    <h3>PRODUCTOS DISPONIBLES</h3>
    <p></p>

    <?php if(!empty($productos)) : ?>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Precio</th>
                    <th>Unidades</th>
                    <th>Detalles</th>
                    <th>Imagen</th>
                    <th>Editar</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($productos as $producto) : ?>
                    <tr>
                        <th><?php echo $producto['id']; ?></th>
                        <td><?php echo $producto['nombre']; ?></td>
                        <td><?php echo $producto['marca']; ?></td>
                        <td><?php echo $producto['modelo']; ?></td>
                        <td><?php echo $producto['precio']; ?></td>
                        <td><?php echo $producto['unidades']; ?></td>
                        <td><?php echo $producto['detalles']; ?></td>
                        <td><img src="<?php echo $producto['imagen']; ?>" width="100" /></td>
                        <td><a href="formulario_productos_v2.php?id=<?php echo $producto['id']; ?>" class="btn btn-primary">Editar</a></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php else : ?>
        <p>No se encontraron productos con el tope especificado.</p>
    <?php endif; ?>
</body>
</html>
