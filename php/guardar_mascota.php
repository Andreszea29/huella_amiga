<?php
require("conexion.php");
asegurar_columnas_mascotas($conn);

// ---- LISTAR: mascotas disponibles en JSON (lo usa adopcion.html) ----
if ($_SERVER["REQUEST_METHOD"] == "GET" && ($_GET['accion'] ?? '') === 'listar') {
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    $res = $conn->query("SELECT id, nombre_mascota, raza_mascota, tipo_mascota, edad_mascota, temperamento, imagen
                         FROM mascotas WHERE estado = 'disponible' ORDER BY id DESC");
    $mascotas = [];
    if ($res) {
        while ($fila = $res->fetch_assoc()) { $mascotas[] = $fila; }
    }
    echo json_encode($mascotas);
    exit;
}

// ---- GUARDAR: publicar una mascota nueva (formulario) ----
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Hay que haber iniciado sesión: así usuario_id queda guardado y no en NULL
    requerir_login('Debes iniciar sesión para publicar una mascota.');

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

    if (count($_POST['confirmaciones'] ?? []) < 3) {
        terminar("Debes aceptar las tres confirmaciones para publicar.", "back", "warning");
    }

    // ---- Foto obligatoria (JPG o PNG, máximo 5 MB) ----
    if (!isset($_FILES['foto']) || $_FILES['foto']['error'] === UPLOAD_ERR_NO_FILE) {
        terminar("Debes subir una foto de la mascota.", "back", "warning");
    }
    $foto = $_FILES['foto'];
    if ($foto['error'] === UPLOAD_ERR_INI_SIZE || $foto['error'] === UPLOAD_ERR_FORM_SIZE || $foto['size'] > 5 * 1024 * 1024) {
        terminar("La foto es muy pesada. El máximo es 5 MB.", "back", "warning");
    }
    if ($foto['error'] !== UPLOAD_ERR_OK) {
        terminar("No se pudo subir la foto. Intenta de nuevo.", "back", "error");
    }
    $info = @getimagesize($foto['tmp_name']);
    $extensiones = [IMAGETYPE_JPEG => 'jpg', IMAGETYPE_PNG => 'png'];
    if (!$info || !isset($extensiones[$info[2]])) {
        terminar("La foto debe ser JPG o PNG.", "back", "warning");
    }
    $carpeta = __DIR__ . '/../imagenes/mascotas';
    if (!is_dir($carpeta)) { mkdir($carpeta, 0755, true); }
    $archivo = 'mascota_' . bin2hex(random_bytes(8)) . '.' . $extensiones[$info[2]];
    if (!move_uploaded_file($foto['tmp_name'], $carpeta . '/' . $archivo)) {
        terminar("No se pudo guardar la foto en el servidor.", "back", "error");
    }
    $imagen = 'mascotas/' . $archivo;   // ruta relativa a /imagenes, es lo que se guarda en la BD

    $sql = "INSERT INTO mascotas (usuario_id, nombre_mascota, raza_mascota, tipo_mascota, edad_mascota, peso_mascota, sexo, tamano, esterilizado, vacunas, temperamento, descripcion, nombre_contacto, correo_contacto, telefono_contacto, ciudad_contacto, motivo, confirmaciones, imagen)
            VALUES ($usuario_id, '$nombre_mascota', '$raza_mascota', '$tipo_mascota', '$edad_mascota', '$peso_mascota', '$sexo', '$tamano', '$esterilizado', '$vacunas', '$temperamento', '$descripcion', '$nombre_contacto', '$correo_contacto', '$telefono_contacto', '$ciudad_contacto', '$motivo', '$confirmaciones', '$imagen')";

    if ($conn->query($sql) === TRUE) {
        terminar("¡Mascota publicada! Ya aparece en la página de adopción.", "../modules/adopcion.html");
    } else {
        @unlink($carpeta . '/' . $archivo);
        terminar("No se pudo publicar la mascota. Intenta de nuevo.", "back", "error");
    }
}
?>
