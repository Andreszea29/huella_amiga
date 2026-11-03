<?php
require("conexion.php");
asegurar_columnas_mascotas($conn);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Para adoptar hay que haber iniciado sesión
    requerir_login('Debes iniciar sesión para solicitar una adopción.');

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

    if (count($_POST['compromisos'] ?? []) < 3) {
        terminar("Debes aceptar los tres compromisos para continuar.", "back", "warning");
    }

    // ---- Mascota elegida: primero por id (viene de la tarjeta), si no por nombre ----
    // Antes solo se buscaba por nombre y por eso mascota_id quedaba en NULL.
    $mascota_id = 'NULL';
    $id_elegido = (int)($_POST['mascota_id'] ?? 0);

    if ($id_elegido > 0) {
        $m = $conn->query("SELECT id FROM mascotas WHERE id = $id_elegido AND estado = 'disponible' LIMIT 1");
        if ($m && $fila = $m->fetch_assoc()) {
            $mascota_id = (int)$fila['id'];
        } else {
            terminar("Esa mascota ya fue adoptada o ya no está disponible.", "../modules/adopcion.html", "info");
        }
    } elseif ($mascota_mente != '') {
        $m = $conn->query("SELECT id FROM mascotas WHERE nombre_mascota = '$mascota_mente' AND estado = 'disponible' LIMIT 1");
        if ($m && $fila = $m->fetch_assoc()) {
            $mascota_id = (int)$fila['id'];
        }
    }

    $sql = "INSERT INTO solicitudes_adopcion (usuario_id, mascota_id, nombre, correo, telefono, ciudad, vivienda, patio, mascotas, otras_mascotas, personas_hogar, tipo_mascota, tamano, edad_pref, mascota_mente, compromisos)
            VALUES ($usuario_id, $mascota_id, '$nombre', '$correo', '$telefono', '$ciudad', '$vivienda', '$patio', '$mascotas', '$otras_mascotas', '$personas_hogar', '$tipo_mascota', '$tamano', '$edad_pref', '$mascota_mente', '$compromisos')";

    if ($conn->query($sql) === TRUE) {
        $destino = "../modules/adopcion.html";

        if ($mascota_id !== 'NULL') {
            // La mascota deja de aparecer en adopción, pero el registro NO se borra
            // (así la solicitud conserva su mascota_id y no queda en NULL).
            $conn->query("UPDATE mascotas SET estado = 'adoptada' WHERE id = $mascota_id");
        } elseif (!empty($_POST['mascota_nombre'])) {
            // Mascota fija del HTML (no está en la BD): adopcion.html la oculta con este aviso
            $destino .= "?adoptada=" . urlencode(trim($_POST['mascota_nombre']));
        }

        terminar("¡Solicitud de adopción enviada! La revisaremos en 48 horas.", $destino);
    } else {
        terminar("No se pudo enviar la solicitud. Intenta de nuevo.", "back", "error");
    }
}
?>
