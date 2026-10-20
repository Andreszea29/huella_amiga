<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre_mascota = limpiar($conn, 'nombre-mascota');
    $raza_mascota = limpiar($conn, 'raza-mascota');
    $tipo_mascota = limpiar($conn, 'tipo_mascota');
    $edad_mascota = limpiar($conn, 'edad-mascota');
    $peso_mascota = limpiar($conn, 'peso-mascota');
    $sexo = limpiar($conn, 'sexo');
    $tamano = limpiar($conn, 'tamano');
    $esterilizado = limpiar($conn, 'esterilizado');
    $vacunas = limpiar($conn, 'vacunas');
    $temperamento = unir($conn, 'temperamento');
    $descripcion = limpiar($conn, 'descripcion-mascota');
    $nombre_contacto = limpiar($conn, 'nombre-contacto');
    $correo_contacto = limpiar($conn, 'correo-contacto');
    $telefono_contacto = limpiar($conn, 'telefono-contacto');
    $ciudad_contacto = limpiar($conn, 'ciudad-contacto');
    $motivo = limpiar($conn, 'motivo-publicacion');
    $confirmaciones = unir($conn, 'confirmaciones');
    $usuario_id = usuario_actual();

    $sql = "INSERT INTO mascotas (usuario_id, nombre_mascota, raza_mascota, tipo_mascota, edad_mascota, peso_mascota, sexo, tamano, esterilizado, vacunas, temperamento, descripcion, nombre_contacto, correo_contacto, telefono_contacto, ciudad_contacto, motivo, confirmaciones)
            VALUES ($usuario_id, '$nombre_mascota', '$raza_mascota', '$tipo_mascota', '$edad_mascota', '$peso_mascota', '$sexo', '$tamano', '$esterilizado', '$vacunas', '$temperamento', '$descripcion', '$nombre_contacto', '$correo_contacto', '$telefono_contacto', '$ciudad_contacto', '$motivo', '$confirmaciones')";

    if ($conn->query($sql) === TRUE) {
        terminar("Mascota enviada. La revisaremos en 48 horas.", "../modules/adopcion.html");
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
