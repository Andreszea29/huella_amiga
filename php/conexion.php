<?php

session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "huella_amiga";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexion fallida: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");


function limpiar($conn, $campo) {
    return $conn->real_escape_string(trim($_POST[$campo] ?? ''));
}


function unir($conn, $campo) {
    $valores = isset($_POST[$campo]) ? (array)$_POST[$campo] : [];
    return $conn->real_escape_string(implode(", ", $valores));
}


function usuario_actual() {
    return isset($_SESSION['usuario_id']) ? (int)$_SESSION['usuario_id'] : 'NULL';
}


function terminar($mensaje, $destino) {
    echo "<script>alert('" . addslashes($mensaje) . "'); window.location.href='" . $destino . "';</script>";
    exit;
}
?>
