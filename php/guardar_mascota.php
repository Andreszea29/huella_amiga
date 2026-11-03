<?php
require("conexion.php");

// ---- LISTAR: devuelve las mascotas publicadas en JSON (lo usa adopcion.html) ----
if ($_SERVER["REQUEST_METHOD"] == "GET" && ($_GET['accion'] ?? '') === 'listar') {
    header('Content-Type: application/json; charset=utf-8');
    $res = $conn->query("SELECT id, nombre_mascota, raza_mascota, tipo_mascota, edad_mascota, temperamento
                         FROM mascotas ORDER BY id DESC");
    $mascotas = [];
    if ($res) {
        while ($fila = $res->fetch_assoc()) { $mascotas[] = $fila; }
    }
    echo json_encode($mascotas);
    exit;
}

// ---- ADOPTAR: elimina la mascota de la base de datos ----
if ($_SERVER["REQUEST_METHOD"] == "POST" && ($_POST['accion'] ?? '') === 'adoptar') {
    header('Content-Type: application/json; charset=utf-8');
    $id = intval($_POST['id'] ?? 0);
    $stmt = $conn->prepare("DELETE FROM mascotas WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    echo json_encode(['ok' => $stmt->affected_rows > 0]);
    exit;
}

// ---- GUARDAR: publicar una mascota nueva (formulario) ----
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
        terminar("Mascota enviada. Ya aparece en la página de adopción.", "../modules/adopcion.html");
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
