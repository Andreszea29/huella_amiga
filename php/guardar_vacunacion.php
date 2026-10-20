<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre_dueno = limpiar($conn, 'nombre_dueno');
    $telefono = limpiar($conn, 'telefono');
    $correo = limpiar($conn, 'correo');
    $nombre_mascota = limpiar($conn, 'nombre_mascota');
    $tipo_mascota = limpiar($conn, 'tipo_mascota');
    $raza = limpiar($conn, 'raza');
    $edad = limpiar($conn, 'edad');
    $peso = limpiar($conn, 'peso');
    $vacunas = unir($conn, 'vacunas');
    $fecha = limpiar($conn, 'fecha');
    $horario = limpiar($conn, 'horario');
    $usuario_id = usuario_actual();

    $sql = "INSERT INTO vacunaciones (usuario_id, nombre_dueno, telefono, correo, nombre_mascota, tipo_mascota, raza, edad, peso, vacunas, fecha, horario)
            VALUES ($usuario_id, '$nombre_dueno', '$telefono', '$correo', '$nombre_mascota', '$tipo_mascota', '$raza', '$edad', '$peso', '$vacunas', '$fecha', '$horario')";

    if ($conn->query($sql) === TRUE) {
        terminar("Tu cita de vacunación quedó registrada.", "../modules/index.html");
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
