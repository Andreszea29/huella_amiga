<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre      = trim($_POST['nombre'] ?? '');
    $genero      = $_POST['genero'] ?? '';
    $edad        = trim($_POST['edad'] ?? '');
    $experiencia = $_POST['experiencia'] ?? '';

    $horarios    = isset($_POST['horarios']) ? implode(", ", $_POST['horarios']) : '';

    $sql = "INSERT INTO voluntarios_spa (nombre, genero, edad, experiencia, horarios)
        VALUES ('$nombre', '$genero', '$edad', '$experiencia', '$horarios')";

    if ($conn->query($sql) === TRUE) {
    echo "registro guardado correctamente.";
    } else {
    echo "Error" . $sql . "<br>" . $conn->error;
    }
}
?>
