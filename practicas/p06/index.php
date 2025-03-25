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

    <h2>Ejercicio 3</h2>
    <p>Utiliza un ciclo while para encontrar el primer número entero obtenido aleatoriamente, pero que además sea múltiplo de un número dado.</p>
    <form method="GET">
        <label for="multiplo">Ingrese un número:</label>
        <input type="number" name="multiplo" required>
        <button type="submit">Buscar</button>
    </form>
    
    <?php if (isset($multiplo)) : ?>
        <h3>Resultados:</h3>
        <p>Primer múltiplo encontrado con while: <strong><?php echo encontrarMultiploWhile($multiplo); ?></strong></p>
        <p>Primer múltiplo encontrado con do-while: <strong><?php echo encontrarMultiploDoWhile($multiplo); ?></strong></p>
    <?php endif; ?>
    
    <h2>Ejercicio 4</h2>
    <p>Crear un arreglo cuyos índices van de 97 a 122 y cuyos valores son las letras de la ‘a’ a la ‘z’. Usa la función chr(n) que devuelve el caracter cuyo código ASCII es n para poner el valor en cada índice.</p>

    <?php 
        $arreglo = generarArregloASCII();
    ?>

    <table border="1">
        <tr>
            <th>Índice ASCII</th>
            <th>Carácter</th>
        </tr>
        <?php foreach ($arreglo as $key => $value) : ?>
            <tr>
                <td><?php echo $key; ?></td>
                <td><?php echo $value; ?></td>
            </tr>
        <?php endforeach; ?>
    </table>

    <h2>Ejercicio 5</h2>
    <p>Usar las variables $edad y $sexo en una instrucción if para identificar una persona de sexo “femenino”, cuya edad oscile entre los 18 y 35 años y mostrar un mensaje de bienvenida apropiado.</p>
    <form action="src/funciones.php" method="POST">
        <label for="edad">Ingrese su edad:</label>
        <input type="number" name="edad" required>
        <br>
        <label for="sexo">Seleccione su sexo:</label>
        <select name="sexo" required>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
        </select>
        <br>
        <button type="submit">Verificar</button>
    </form>

    <h2>Ejercicio 6</h2>
    <p>Crea en código duro un arreglo asociativo que sirva para registrar el parque vehicular de una ciudad. Cada vehículo debe ser identificado por:</p>

    <form method="GET">
        <label for="matricula">Ingrese la matrícula del auto:</label>
        <input type="text" name="matricula" placeholder="Ejemplo: ABC1234">
        <button type="submit">Buscar</button>
    </form>

    <form method="GET">
        <button type="submit" name="todos" value="1">Mostrar todos los autos</button>
    </form>

    <?php

    if (isset($_GET['matricula']) && !empty($_GET['matricula'])) {
        $matricula = strtoupper(trim($_GET['matricula']));
        $resultado = buscarAutoPorMatricula($matricula);
        echo "<pre>";
        print_r($resultado);
        echo "</pre>";
    } elseif (isset($_GET['todos'])) {
        echo "<pre>";
        print_r(obtenerTodosLosAutos());
        echo "</pre>";
    }
    ?>

</body>
</html>