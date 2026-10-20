<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "huella_amiga";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexion fallida: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");

// Limpia un dato del formulario para guardarlo de forma segura
function limpiar($conn, $campo) {
    return $conn->real_escape_string(trim($_POST[$campo] ?? ''));
}

// Une las casillas marcadas (name="campo[]") en un solo texto
function unir($conn, $campo) {
    $valores = isset($_POST[$campo]) ? (array)$_POST[$campo] : [];
    return $conn->real_escape_string(implode(", ", $valores));
}

// Muestra un mensaje y manda al usuario a otra página
function terminar($mensaje, $destino) {
    echo "<script>alert('" . addslashes($mensaje) . "'); window.location.href='" . $destino . "';</script>";
    exit;
}
?>
