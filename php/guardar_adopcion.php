<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = limpiar($conn, 'nombre');
    $correo = limpiar($conn, 'correo');
    $telefono = limpiar($conn, 'telefono');
    $ciudad = limpiar($conn, 'ciudad');
    $vivienda = limpiar($conn, 'vivienda');
    $patio = limpiar($conn, 'patio');
    $mascotas = limpiar($conn, 'mascotas');
    $otras_mascotas = limpiar($conn, 'otras_mascotas');
    $personas_hogar = limpiar($conn, 'personas_hogar');
    $tipo_mascota = limpiar($conn, 'tipo_mascota');
    $tamano = unir($conn, 'tamano');
    $edad_pref = unir($conn, 'edad_pref');
    $mascota_mente = limpiar($conn, 'mascota_mente');
    $compromisos = unir($conn, 'compromisos');
    $usuario_id = usuario_actual();

 
    $mascota_id = 'NULL';
    if ($mascota_mente != '') {
        $m = $conn->query("SELECT id FROM mascotas WHERE nombre_mascota = '$mascota_mente' LIMIT 1");
        if ($m && $fila = $m->fetch_assoc()) {
            $mascota_id = (int)$fila['id'];
        }
    }

    $sql = "INSERT INTO solicitudes_adopcion (usuario_id, mascota_id, nombre, correo, telefono, ciudad, vivienda, patio, mascotas, otras_mascotas, personas_hogar, tipo_mascota, tamano, edad_pref, mascota_mente, compromisos)
            VALUES ($usuario_id, $mascota_id, '$nombre', '$correo', '$telefono', '$ciudad', '$vivienda', '$patio', '$mascotas', '$otras_mascotas', '$personas_hogar', '$tipo_mascota', '$tamano', '$edad_pref', '$mascota_mente', '$compromisos')";

    if ($conn->query($sql) === TRUE) {
        terminar("Solicitud de adopción enviada. La revisaremos en 48 horas.", "../modules/index.html");
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
