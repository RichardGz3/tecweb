<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejemplo 4 de POO en PHP</title>
</head>
<body>
    <?php
    require_once __DIR__ . '/Tabla.php';

    $tab1 = new Tabla(2, 3, 'border: 1px solid');
    $tab1->cargar(0, 0, 'Furina');
    $tab1->cargar(0, 1, 'Navia');
    $tab1->cargar(0, 2, 'Varesa');
    $tab1->cargar(1, 0, 'Xilonen');
    $tab1->cargar(1, 1, 'Mualani');
    $tab1->cargar(1, 2, 'Mavuika');
    $tab1->graficar();
    ?>
</body>
</html>