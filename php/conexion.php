<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "huella_amiga";


$conn = new mysql($servername, $username, $password, $dbname)


if ($conn->connect_error) {
    die("Conexion fallida: " . $conn->connect_error);
}
?>