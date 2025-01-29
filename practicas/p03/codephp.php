<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title> Una página PHP </title>
</head>
<body>
    <?php
        echo "<h3> El día de hoy es el ". date('d / M / Y H:i:s')."</h3> <hr/>";
        echo "<h2>Bienvenido a mi sitio PHP 5 </h2>";
        $variable1 = "PHP 5"; // Definimos la variable $variable1
        $variable2 = "MySQL"; // Definimos la variable $variable2
    ?>
    <p>Vas a descubrir <?= $variable1 ?></p>
    <?php
        echo "<h2> Buenos días de $variable1 </h2>";
    ?>
    <p> Utilización de variables PHP <br/> Vas a descubrir igualmente
    <?php
        echo $variable2;
    ?>
    </p>
    <?= "<div><big> Buenos días de $variable2 </big></div>" ?>
</body>
</html>