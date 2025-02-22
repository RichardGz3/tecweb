<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">
<?php
    $data = array();

	/** SE CREA EL OBJETO DE CONEXION */
	@$link = new mysqli('localhost', 'root', 'LGomr05RicML', 'marketzone');

	/** comprobar la conexión */
	if ($link->connect_errno) {
		die('Falló la conexión: '.$link->connect_error.'<br/>');
	}

	/** Consulta para obtener los productos vigentes (donde eliminado = 0) */
	if ( $result = $link->query("SELECT * FROM productos WHERE eliminado = 0") ) {
		$row = $result->fetch_all(MYSQLI_ASSOC);

		foreach($row as $num => $registro) {           
			foreach($registro as $key => $value) {     
				$data[$num][$key] = utf8_encode($value);
			}
		}

		$result->free();
	}

	$link->close();
?>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Productos Vigentes</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>
<body>
	<h3>PRODUCTOS VIGENTES</h3>
	<br/>
	
	<?php if( isset($row) ) : ?>
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
				<?php foreach($row as $value) : ?>
				<tr>
					<th scope="row"><?= $value['id'] ?></th>
					<td><?= $value['nombre'] ?></td>
					<td><?= $value['marca'] ?></td>
					<td><?= $value['modelo'] ?></td>
					<td><?= $value['precio'] ?></td>
					<td><?= $value['unidades'] ?></td>
					<td><?= $value['detalles'] ?></td>
					<td><img src=<?= $value['imagen'] ?> width="100"></td>
				</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
	<?php else : ?>
		<p>No hay productos vigentes.</p>
	<?php endif; ?>
</body>
</html>
