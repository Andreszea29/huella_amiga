<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre_dueno   = trim($_POST['nombre-dueno'] ?? '');
    $telefono       = trim($_POST['telefono'] ?? '');
    $nombre_mascota = trim($_POST['nombre-mascota'] ?? '');
    $raza_mascota   = trim($_POST['raza-mascota'] ?? '');
    $tamano         = $_POST['tamano'] ?? '';
    $direccion      = trim($_POST['direccion'] ?? '');

    $dias           = isset($_POST['dias']) ? implode(", ", $_POST['dias']) : '';
    $turnos         = isset($_POST['turnos']) ? implode(", ", $_POST['turnos']) : '';

    $sql = "INSERT INTO solicitudes_paseo (nombre_dueno, telefono, nombre_mascota, raza_mascota, tamano, direccion, dias, turnos)
        VALUES ('$nombre_dueno', '$telefono', '$nombre_mascota', '$raza_mascota', '$tamano', '$direccion', '$dias', '$turnos')";

    if ($conn->query($sql) === TRUE) {
    echo "registro guardado correctamente.";
    } else {
    echo "Error" . $sql . "<br>" . $conn->error;
    }
}
?>
