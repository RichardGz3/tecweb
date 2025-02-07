<?php
        if(isset($_GET['numero']))
        {
            $num = $_GET['numero'];
            if ($num%5==0 && $num%7==0)
            {
                echo '<h3>R= El número '.$num.' SÍ es múltiplo de 5 y 7.</h3>';
            }
            else
            {
                echo '<h3>R= El número '.$num.' NO es múltiplo de 5 y 7.</h3>';
            }
        }
    ?>

<?php
function Secuencia($max_iteraciones = 4) {
    $matriz = [];
    $iteraciones = 0;
    $totalNumeros = 0;

    while (true) {
        $fila = [];
        
        // Generar un numero impar
        do {
            $num1 = rand(1, 999);
        } while ($num1 % 2 == 0);

        // Generar un numero par
        do {
            $num2 = rand(1, 999);
        } while ($num2 % 2 != 0);

        // Generar otro numero impar
        do {
            $num3 = rand(1, 999);
        } while ($num3 % 2 == 0);

        // Agregar la secuencia a la matriz
        $fila = [$num1, $num2, $num3];
        $matriz[] = $fila;
        $iteraciones++;
        $totalNumeros += 3;

        // Salir después de cierta cantidad de intentos
        if ($iteraciones >= $max_iteraciones) {
            break;
        }
    }

    return [
        'matriz' => $matriz,
        'iteraciones' => $iteraciones,
        'totalNumeros' => $totalNumeros
    ];
}
?>

<?php
if (isset($_GET['multiplo'])) {
    $multiplo = $_GET['multiplo'];
    
    function encontrarMultiploWhile($multiplo) {
        while (true) {
            $num = rand(1, 1000);
            if ($num % $multiplo == 0) {
                return $num;
            }
        }
    }
    
    function encontrarMultiploDoWhile($multiplo) {
        do {
            $num = rand(1, 1000);
        } while ($num % $multiplo != 0);
        
        return $num;
    }
}
?>

<?php
function generarArregloASCII() {
    $arreglo = [];
    for ($i = 97; $i <= 122; $i++) {
        $arreglo[$i] = chr($i);
    }
    return $arreglo;
}
?>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $edad = $_POST['edad'];
    $sexo = $_POST['sexo'];
    
    if ($sexo == "femenino" && $edad >= 18 && $edad <= 35) {
        echo "<h3>Bienvenida, usted está en el rango de edad permitido.</h3>";
    } else {
        echo "<h3>Lo sentimos, no cumple con los requisitos.</h3>";
    }
}
?>