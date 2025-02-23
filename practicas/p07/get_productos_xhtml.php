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
    /** SE CREA EL OBJETO DE CONEXION */
    @$link = new mysqli('localhost', 'root', 'LGomr05RicML', 'marketzone');    

    /** comprobar la conexión */
    if ($link->connect_errno) 
    {
        die('<p>Falló la conexión: '.$link->connect_error.'</p>');
    }

    /** Crear una tabla que no devuelve un conjunto de resultados */
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
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Unidades</th>
                    <th scope="col">Detalles</th>
                    <th scope="col">Imagen</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($productos as $producto) : ?>
                    <tr>
                        <th scope="row"><?php echo $producto['id']; ?></th>
                        <td><?php echo $producto['nombre']; ?></td>
                        <td><?php echo $producto['marca']; ?></td>
                        <td><?php echo $producto['modelo']; ?></td>
                        <td><?php echo $producto['precio']; ?></td>
                        <td><?php echo $producto['unidades']; ?></td>
                        <td><?php echo $producto['detalles']; ?></td>
                        <td>
                            <img src="<?php echo $producto['imagen']; ?>" width="100" alt="Imagen del producto" />
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php else : ?>
        <p>No se encontraron productos con el tope especificado.</p>
    <?php endif; ?>
</body>
</html>

