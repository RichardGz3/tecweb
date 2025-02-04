<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Práctica 4</title>
</head>
<body>
    <h2>Ejercicio 1</h2>
    <p>Determina cuál de las siguientes variables son válidas y explica por qué: </p>
    <p>$_myvar,  $_7var,  myvar,  $myvar,  $var7,  $_element1, $house*5 </p>
    <?php
        //AQUI VA MI CÓDIGO PHP
        $_myvar;
        $_7var;
        //myvar;       // Inválida
        $myvar;
        $var7;
        $_element1;
        //$house*5;     // Invalida
        
        echo '<h3>Respuesta:</h3>';   
    
        echo '<ul>';
        echo '<li>$_myvar es válida porque inicia con guión bajo.</li>';
        echo '<li>$_7var es válida porque inicia con guión bajo.</li>';
        echo '<li>myvar es inválida porque no tiene el signo de dolar ($).</li>';
        echo '<li>$myvar es válida porque inicia con una letra.</li>';
        echo '<li>$var7 es válida porque inicia con una letra.</li>';
        echo '<li>$_element1 es válida porque inicia con guión bajo.</li>';
        echo '<li>$house*5 es inválida porque el símbolo * no está permitido.</li>';
        echo '</ul>';

        // Ejercicio 2
        echo "<h3>Ejercicio 2: Referencias</h3>";
        $a = "ManejadorSQL";
        $b = 'MySQL';
        $c = &$a;
        echo "a: $a, b: $b, c: $c <br>";
        $a = "PHP server";
        $b = &$a;
        echo "a: $a, b: $b, c: $c <br>";

        echo "<p>Descripción:</p>";
        echo "<p>En el segundo bloque de asignaciones, se cambia el valor de \$a a 'PHP server', y luego \$b se convierte en una referencia a \$a. Como \$c ya era una referencia a \$a, también cambia su valor.</p>";

        // Ejercicio 3
        echo "<h3>Ejercicio 3: Evolución de Variables</h3>";
        $a = "PHP5";
        $z[] = &$a;
        $b = "5a version de PHP";
        @$c = $b * 10;
        $a .= $b;
        @$b *= $c;
        $z[0] = "MySQL";
        print_r(["a" => $a, "b" => $b, "c" => $c, "z" => $z]);
        
        // Ejercicio 4
        echo "<h3>Ejercicio 4: Uso de GLOBALS</h3>";
        global $a, $b, $c, $z;
        echo "a: " . $GLOBALS['a'] . "<br>";
        echo "b: " . $GLOBALS['b'] . "<br>";
        echo "c: " . $GLOBALS['c'] . "<br>";
        echo "z: "; print_r($GLOBALS['z']); echo "<br>";
    ?>
</body>
</html>