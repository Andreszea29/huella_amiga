<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre         = trim($_POST['nombre'] ?? '');
    $correo         = trim($_POST['correo'] ?? '');
    $telefono       = trim($_POST['telefono'] ?? '');
    $ciudad         = trim($_POST['ciudad'] ?? '');
    $vivienda       = $_POST['vivienda'] ?? '';
    $patio          = $_POST['patio'] ?? '';
    $mascotas       = $_POST['mascotas'] ?? '';
    $otras_mascotas = trim($_POST['otras_mascotas'] ?? '');
    $personas_hogar = trim($_POST['personas_hogar'] ?? '');
    $tipo_mascota   = $_POST['tipo_mascota'] ?? '';
    $tamano         = isset($_POST['tamano']) ? implode(", ", $_POST['tamano']) : '';
    $edad_pref      = isset($_POST['edad_pref']) ? implode(", ", $_POST['edad_pref']) : '';
    $mascota_mente  = trim($_POST['mascota_mente'] ?? '');

    // Compromisos aceptados
    $compromisos    = isset($_POST['compromisos']) ? implode(", ", $_POST['compromisos']) : '';

    $sql = "INSERT INTO solicitudes_adopcion (nombre, correo, telefono, ciudad, vivienda, patio, mascotas, otras_mascotas, personas_hogar, tipo_mascota, tamano, edad_pref, mascota_mente, compromisos)
                VALUES ('$nombre', '$correo', '$telefono', '$ciudad', '$vivienda', '$patio', '$mascotas', '$otras_mascotas', '$personas_hogar', '$tipo_mascota', '$tamano', '$edad_pref', '$mascota_mente', '$compromisos')";

    if ($conn->query($sql) === TRUE) {
    echo "registro guardado correctamente.";
    } else {
    echo "Error" . $sql . "<br>" . $conn->error;
    }
}
?>
