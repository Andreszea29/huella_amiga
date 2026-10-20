<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre      = trim($_POST['nombre'] ?? '');
    $genero      = $_POST['genero'] ?? '';
    $edad        = trim($_POST['edad'] ?? '');
    $experiencia = $_POST['experiencia'] ?? '';

    $horarios    = isset($_POST['horarios']) ? implode(", ", $_POST['horarios']) : '';
}
?>
