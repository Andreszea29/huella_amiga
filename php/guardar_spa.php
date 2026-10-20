<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = limpiar($conn, 'nombre');
    $genero = limpiar($conn, 'genero');
    $edad = limpiar($conn, 'edad');
    $experiencia = limpiar($conn, 'experiencia');
    $horarios = unir($conn, 'horarios');
    $usuario_id = usuario_actual();

    $sql = "INSERT INTO voluntarios_spa (usuario_id, nombre, genero, edad, experiencia, horarios)
            VALUES ($usuario_id, '$nombre', '$genero', '$edad', '$experiencia', '$horarios')";

    if ($conn->query($sql) === TRUE) {
        terminar("Gracias por postularte. Revisaremos tu solicitud pronto.", "../modules/index.html");
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
