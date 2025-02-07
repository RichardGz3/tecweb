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

<?php
$autos = [
    "ABC1234" => [
        "Auto" => ["marca" => "HONDA", "modelo" => 2020, "tipo" => "camioneta"],
        "Propietario" => ["nombre" => "Alfonzo Esparza", "ciudad" => "Puebla, Pue.", "direccion" => "C.U., Jardines de San Manuel"]
    ],
    "DEF5678" => [
        "Auto" => ["marca" => "MAZDA", "modelo" => 2019, "tipo" => "sedan"],
        "Propietario" => ["nombre" => "Ma. del Consuelo Molina", "ciudad" => "Puebla, Pue.", "direccion" => "97 oriente"]
    ],
    "GIM4332" => [
        "Auto" => ["marca" => "Lexus", "modelo" => 2023, "tipo" => "sedan"],
        "Propietario" => ["nombre" => "Ricardo González", "ciudad" => "Puebla, Pue.", "direccion" => "Hidalgo 20"]
    ],
    "FOA3016" => [
        "Auto" => ["marca" => "VOLKSWAGEN", "modelo" => 2020, "tipo" => "sedan"],
        "Propietario" => ["nombre" => "Ismael Banderas", "ciudad" => "Tlayacapan, Morelos", "direccion" => "101 norte"]
    ],
    "SOG1123" => [
        "Auto" => ["marca" => "FORD", "modelo" => 2022, "tipo" => "camioneta"],
        "Propietario" => ["nombre" => "Gabriel Tepanohaya", "ciudad" => "Tlayacapan, Morelos", "direccion" => "Santa Ana 10"]
    ],
    "SLA0051" => [
        "Auto" => ["marca" => "NISSAN", "modelo" => 2023, "tipo" => "break"],
        "Propietario" => ["nombre" => "Gerardo Martínez", "ciudad" => "Guadalajara, Jalisco", "direccion" => "Tlaquepaque oriente"]
    ],
    "ASG9320" => [
        "Auto" => ["marca" => "TESLA", "modelo" => 2020, "tipo" => "furgoneta"],
        "Propietario" => ["nombre" => "Marco Antonio Garcia", "ciudad" => "Col. Del Valle, CDMX", "direccion" => "Av. Insurgentes Sur 1234"]
    ],
    "ARF1235" => [
        "Auto" => ["marca" => "FORD", "modelo" => 2019, "tipo" => "camioneta"],
        "Propietario" => ["nombre" => "Rodrigo Carreto", "ciudad" => "Guadalajara, Jalisco", "direccion" => "Calle Morelos 567"]
    ],
    "FAF7881" => [
        "Auto" => ["marca" => "AUDI", "modelo" => 2021, "tipo" => "break"],
        "Propietario" => ["nombre" => "Harumi Perez", "ciudad" => "Monterrey, Nuevo Leon", "direccion" => "Blvd. Díaz Ordaz 890"]
    ],
    "FOSA512" => [
        "Auto" => ["marca" => "BUGATTI", "modelo" => 2024, "tipo" => "sedan"],
        "Propietario" => ["nombre" => "Felix Melchor", "ciudad" => "Puebla, Pue", "direccion" => "Av. Juárez 321"]
    ],
    "APS8851" => [
        "Auto" => ["marca" => "CHEVROLET", "modelo" => 2010, "tipo" => "sedan"],
        "Propietario" => ["nombre" => "Juan Ocelotl", "ciudad" => "Merida, Yucatan", "direccion" => "Calle 60 #250"]
    ],
    "DSA55S1" => [
        "Auto" => ["marca" => "FERRARI", "modelo" => 2022, "tipo" => "break"],
        "Propietario" => ["nombre" => "Bryan Vazques", "ciudad" => "Zona Centro, Tijuana", "direccion" => "Av. Revolución 678"]
    ],
    "KFSL211" => [
        "Auto" => ["marca" => "VOLKSWAGEN", "modelo" => 2015, "tipo" => "camioneta"],
        "Propietario" => ["nombre" => "Flor Lopez", "ciudad" => "Querétaro, Qro", "direccion" => "Av. Tecnológico 990"]
    ],
    "ASK0EQ1" => [
        "Auto" => ["marca" => "HYUNDAI", "modelo" => 2018, "tipo" => "coupé"],
        "Propietario" => ["nombre" => "Sarely Escalante", "ciudad" => "Col. Juarez, CDMX", "direccion" => "Paseo de la Reforma 200"]
    ],
    "ADO5951" => [
        "Auto" => ["marca" => "JEEP", "modelo" => 2023, "tipo" => "SUV"],
        "Propietario" => ["nombre" => "Dayana Flores", "ciudad" => " Col. Jardines, Aguascalientes", "direccion" => "Av. Universidad 777"]
    ]
];

function buscarAutoPorMatricula($matricula) {
    global $autos;
    return $autos[$matricula] ?? "No se encontró el auto con matrícula: $matricula";
}

function obtenerTodosLosAutos() {
    global $autos;
    return $autos;
}
?>
