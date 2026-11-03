<?php

session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "huella_amiga";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexion fallida: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");


function limpiar($conn, $campo) {
    return $conn->real_escape_string(trim($_POST[$campo] ?? ''));
}


function unir($conn, $campo) {
    $valores = isset($_POST[$campo]) ? (array)$_POST[$campo] : [];
    return $conn->real_escape_string(implode(", ", $valores));
}


function usuario_actual() {
    return isset($_SESSION['usuario_id']) ? (int)$_SESSION['usuario_id'] : 'NULL';
}


function terminar($mensaje, $destino, $icono = 'success') {
    require_once __DIR__ . '/alerta.php';
    alerta($icono, $mensaje, $destino);
}


function esta_logueado() {
    return isset($_SESSION['usuario_id']);
}


function requerir_login($mensaje = 'Debes iniciar sesión para continuar.') {
    if (!esta_logueado()) {
        terminar($mensaje, '../modules/iniciarsesion.html', 'warning');
    }
}


// Auxiliares que usan api_admin.php (antes no existían y daban error fatal)
function iniciar_sesion() {
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }
}

function responder($ok, $mensaje, $extra = [], $codigo = 200) {
    http_response_code($codigo);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array_merge(['ok' => $ok, 'mensaje' => $mensaje], $extra));
    exit;
}

function solo_post() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        responder(false, 'Método no permitido.', [], 405);
    }
}


// La tabla mascotas necesita "imagen" (foto) y "estado" (disponible/adoptada).
// Si faltan, se crean solas la primera vez (no toca ninguna otra columna ni dato).
function asegurar_columnas_mascotas($conn) {
    $existentes = [];
    $r = $conn->query("SHOW COLUMNS FROM mascotas");
    while ($f = $r->fetch_assoc()) { $existentes[] = $f['Field']; }
    if (!in_array('imagen', $existentes)) {
        $conn->query("ALTER TABLE mascotas ADD COLUMN imagen VARCHAR(255) NULL");
    }
    if (!in_array('estado', $existentes)) {
        $conn->query("ALTER TABLE mascotas ADD COLUMN estado VARCHAR(15) NOT NULL DEFAULT 'disponible'");
    }
}
?>
