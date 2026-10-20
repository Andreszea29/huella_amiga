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

    $sql = "INSERT INTO mascotas (nombre_mascota, raza_mascota, tipo_mascota, edad_mascota, peso_mascota, sexo, tamano, esterilizado, vacunas, temperamento, descripcion, nombre_contacto, correo_contacto, telefono_contacto, ciudad_contacto, motivo, confirmaciones)
        VALUES ('$nombre_mascota', '$raza_mascota', '$tipo_mascota', '$edad_mascota', '$peso_mascota', '$sexo', '$tamano', '$esterilizado', '$vacunas', '$temperamento', '$descripcion', '$nombre_contacto', '$correo_contacto', '$telefono_contacto', '$ciudad_contacto', '$motivo', '$confirmaciones')";

    if ($conn->query($sql) === TRUE) {
    echo "registro guardado correctamente.";
    } else {
    echo "Error" . $sql . "<br>" . $conn->error;
    }
}
?>
