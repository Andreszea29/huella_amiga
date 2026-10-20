<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = limpiar($conn, 'nombre');
    $genero = limpiar($conn, 'genero');
    $edad = limpiar($conn, 'edad');
    $experiencia = limpiar($conn, 'experiencia');
    $horarios = unir($conn, 'horarios');

    $sql = "INSERT INTO voluntarios_spa (nombre, genero, edad, experiencia, horarios)
            VALUES ('$nombre', '$genero', '$edad', '$experiencia', '$horarios')";

    if ($conn->query($sql) === TRUE) {
        terminar("Gracias por postularte. Revisaremos tu solicitud pronto.", "../modules/index.html");
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
