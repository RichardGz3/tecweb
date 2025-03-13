<!DOCTYPE html>
<html lang="en">
<head>Ejemplo 5 de POO en PHP </title>
</head>
<body>
    <?php
    include_once __DIR__ . '/Pagina.php';

    $pag1 = new Pagina('El Ático del Programador', 'El Sótano del Programador');

    for ($i=0; $i<15; $i++) {
        $pag1->insertar_cuerpo('Este es el parrafo No. '.($i+1).' que debe aparecer en la Pagina.');
    }
    
    $pag1->graficar();
    ?>
</body>
</html>