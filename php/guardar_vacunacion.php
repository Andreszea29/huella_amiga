<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre_dueno   = trim($_POST['nombre_dueno'] ?? '');
    $telefono       = trim($_POST['telefono'] ?? '');
    $correo         = trim($_POST['correo'] ?? '');

    $nombre_mascota = trim($_POST['nombre_mascota'] ?? '');
    $tipo_mascota   = $_POST['tipo_mascota'] ?? '';
    $raza           = trim($_POST['raza'] ?? '');
    $edad           = trim($_POST['edad'] ?? '');
    $peso           = trim($_POST['peso'] ?? '');

    $vacunas        = isset($_POST['vacunas']) ? implode(", ", $_POST['vacunas']) : '';

    $fecha          = $_POST['fecha'] ?? '';
    $horario        = $_POST['horario'] ?? '';
    
    $sql = "INSERT INTO vacunaciones (nombre_dueno, telefono, correo, nombre_mascota, tipo_mascota, raza, edad, peso, vacunas, fecha, horario)
        VALUES ('$nombre_dueno', '$telefono', '$correo', '$nombre_mascota', '$tipo_mascota', '$raza', '$edad', '$peso', '$vacunas', '$fecha', '$horario')";

    if ($conn->query($sql) === TRUE) {
    echo "registro guardado correctamente.";
    } else {
    echo "Error" . $sql . "<br>" . $conn->error;
    }
}

?>
