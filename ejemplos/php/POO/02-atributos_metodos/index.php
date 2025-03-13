<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejemplo 2 de POO en PHP</title>
</head>
<body>
    <?php
    require_once __DIR__ . '/Menu.php';

    $menu1 = new Menu;
    $menu1->cargar_opcion('http://www.facebook.com' , 'Facebook');
    $menu1->cargar_opcion('http://www.twitter.com' , 'Twitter');
    $menu1->cargar_opcion('http://www.instagram.com' , 'Instagram');
    echo '<br><br>';
    $menu1->mostrar();
    ?>
</body>
</html>