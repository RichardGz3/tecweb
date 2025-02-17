<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">

<head>
    <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=UTF-8" />
    <title>Práctica 4</title>
</head>
<body>
    <h2>Ejercicio 1</h2>
    <p>Determina cuál de las siguientes variables son válidas y explica por qué:</p>
    <p>$_myvar, $_7var, myvar, $myvar, $var7, $_element1, $house*5</p>
    
    <?php
        $_myvar = '';
        $_7var = '';
        $myvar = '';
        $var7 = '';
        $_element1 = '';
        // $house*5; // Inválido
        
        echo '<h3>Respuesta:</h3>';   
        echo '<ul>'; 
        echo '<li>$_myvar es válida porque inicia con guión bajo.</li>'; 
        echo '<li>$_7var es válida porque inicia con guión bajo.</li>'; 
        echo '<li>myvar es inválida porque no tiene el signo de dólar ($).</li>'; 
        echo '<li>$myvar es válida porque inicia con una letra.</li>'; 
        echo '<li>$var7 es válida porque inicia con una letra.</li>'; 
        echo '<li>$_element1 es válida porque inicia con guión bajo.</li>'; 
        echo '<li>$house*5 es inválida porque el símbolo * no está permitido.</li>'; 
        echo '</ul>';
    ?>
    
    <h3>Ejercicio 2: Referencias</h3>
    <?php
        $a = "ManejadorSQL";
        $b = 'MySQL';
        $c = &$a;
        echo "a: $a, b: $b, c: $c <br />";
        $a = "PHP server";
        $b = &$a;
        echo "a: $a, b: $b, c: $c <br />";
    ?>
    
    <h3>Ejercicio 3: Evolución de Variables</h3>
    <?php
        $a = "PHP5";
        echo "\$a = $a <br />";
        $z = array();
        $z[] = &$a;
        echo "\$z = ";
        print_r($z);
        echo "<br />";
        
        $b = "5a version de PHP";
        echo "\$b = $b<br />";
        
        @$c = $b * 10;
        echo "\$c = $c<br />";
        
        $a .= $b;
        echo "\$a = $a<br />";
        
        @$b *= $c;
        echo "\$b = $b<br />";
        
        $z[0] = "MySQL";
        echo "\$z = ";
        print_r($z);
        echo "<br />";
    ?>
    
    <h3>Ejercicio 4: Uso de GLOBALS</h3>
    <?php
        global $a, $b, $c, $z;
        echo "a: " . htmlspecialchars($GLOBALS['a']) . "<br />";
        echo "b: " . htmlspecialchars($GLOBALS['b']) . "<br />";
        echo "c: " . htmlspecialchars($GLOBALS['c']) . "<br />";
        echo "z: "; print_r($GLOBALS['z']); echo "<br />";
    ?>
    
    <h3>Ejercicio 5: Conversión de tipos</h3>
    <?php
        $a = "7 personas";
        $b = (int) $a;
        $a = "9E3";
        $c = (float) $a;
        echo "a: $a, b: $b, c: $c <br />";
    ?>
    
    <h3>Ejercicio 6: Booleanos</h3>
    <?php
        $a = "0";
        $b = "TRUE";
        $c = false;
        $d = ($a || $b);
        $e = ($a && $c);
        $f = ($a xor $b);
        var_dump($a, $b, $c, $d, $e, $f);
        echo "<br /><br />Booleano visible: " . (int)$c . " " . (int)$e . "<br />";
    ?>
    
    <h3>Ejercicio 7: Uso de $_SERVER</h3>
    <?php
        echo "Versión de Apache/PHP: " . htmlspecialchars($_SERVER['SERVER_SOFTWARE']) . "<br />";
        echo "Sistema Operativo del servidor: " . PHP_OS . "<br />";
        echo "Idioma del navegador: " . htmlspecialchars($_SERVER['HTTP_ACCEPT_LANGUAGE']) . "<br />";
    ?>

    <div>
        <a href="https://validator.w3.org/markup/check?uri=referer"><img
        src="https://www.w3.org/Icons/valid-xhtml11" alt="Valid XHTML 1.1" height="31" width="88" /></a>
    </div>

</body>
</html>

