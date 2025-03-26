<?php
namespace MyAPI;

abstract class DataBase {
    protected $conexion;

    public function __construct(
        string $host = 'localhost',
        string $user = 'root',
        string $password = 'LGomr05RicML',
        string $dbname = 'marketzone'
    ) {
        $this->conexion = @mysqli_connect($host, $user, $password, $dbname);

        if (!$this->conexion) {
            die('¡Base de datos NO conectada!');
        }
    }
}
?>