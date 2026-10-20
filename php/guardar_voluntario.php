<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre_dueno = limpiar($conn, 'nombre-dueno');
    $telefono = limpiar($conn, 'telefono');
    $nombre_mascota = limpiar($conn, 'nombre-mascota');
    $raza_mascota = limpiar($conn, 'raza-mascota');
    $tamano = limpiar($conn, 'tamano');
    $direccion = limpiar($conn, 'direccion');
    $dias = unir($conn, 'dias');
    $turnos = unir($conn, 'turnos');
    $plan = limpiar($conn, 'plan');

    $sql = "INSERT INTO solicitudes_paseo (nombre_dueno, telefono, nombre_mascota, raza_mascota, tamano, direccion, dias, turnos, plan)
            VALUES ('$nombre_dueno', '$telefono', '$nombre_mascota', '$raza_mascota', '$tamano', '$direccion', '$dias', '$turnos', '$plan')";

    if ($conn->query($sql) === TRUE) {
        terminar("Solicitud de paseo enviada.", "../modules/index.html");
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
