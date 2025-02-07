<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Práctica 6</title>
</head>
<body>
    <h2>Ejercicio 1</h2>
    <p>Escribir programa para comprobar si un número es un múltiplo de 5 y 7</p>
    <?php include 'src/funciones.php'; ?>

    <h2>Ejercicio 2</h2>
    <p>Crea un programa para la generación repetitiva de 3 números aleatorios hasta obtener una secuencia compuesta</p>
    <?php 
    $resultado = Secuencia();
    $matriz = $resultado['matriz'];
    $iteraciones = $resultado['iteraciones'];
    $totalNumeros = $resultado['totalNumeros'];
    ?>

    <h3>Secuencias Generadas</h3>
    <table border="1">
        <tr>
            <th>Número 1 (impar)</th>
            <th>Número 2 (par)</th>
            <th>Número 3 (impar)</th>
        </tr>
        <?php foreach ($matriz as $fila) : ?>
            <tr>
                <td><?php echo $fila[0]; ?></td>
                <td><?php echo $fila[1]; ?></td>
                <td><?php echo $fila[2]; ?></td>
            </tr>
        <?php endforeach; ?>
    </table>
    
    <p><?php echo "$totalNumeros números obtenidos en $iteraciones iteraciones."; ?></p>

    

</body>
</html>