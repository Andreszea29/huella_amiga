<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre_mascota = trim($_POST['nombre-mascota'] ?? '');
    $raza_mascota   = trim($_POST['raza-mascota'] ?? '');
    $tipo_mascota   = $_POST['tipo_mascota'] ?? '';
    $edad_mascota   = trim($_POST['edad-mascota'] ?? '');
    $peso_mascota   = trim($_POST['peso-mascota'] ?? '');
    $sexo           = $_POST['sexo'] ?? '';
    $tamano         = $_POST['tamano'] ?? '';
    $esterilizado   = $_POST['esterilizado'] ?? '';
    $vacunas        = $_POST['vacunas'] ?? '';
    $temperamento   = isset($_POST['temperamento']) ? implode(", ", $_POST['temperamento']) : '';
    $descripcion    = trim($_POST['descripcion-mascota'] ?? '');
    $nombre_contacto   = trim($_POST['nombre-contacto'] ?? '');
    $correo_contacto   = trim($_POST['correo-contacto'] ?? '');
    $telefono_contacto = trim($_POST['telefono-contacto'] ?? '');
    $ciudad_contacto   = trim($_POST['ciudad-contacto'] ?? '');
    $motivo            = $_POST['motivo-publicacion'] ?? '';

    $confirmaciones = isset($_POST['confirmaciones']) ? implode(", ", $_POST['confirmaciones']) : '';
}
?>
