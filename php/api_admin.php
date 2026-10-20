<?php
// ---------------------------------------------------------------
// API del panel administrativo (solo para usuarios con rol "admin")
//   GET  api_admin.php?tipo=vacunaciones   -> lista de registros
//   POST api_admin.php  {tipo, id, estado} -> cambia el estado
//   POST api_admin.php  {tipo, id, accion:"eliminar"} -> borra
// ---------------------------------------------------------------
require("conexion.php");
iniciar_sesion();

if (($_SESSION['rol'] ?? '') !== 'admin') {
    responder(false, 'Acceso restringido: inicia sesión con una cuenta de administrador.', ['redirect' => 'iniciarsesion.html'], 403);
}

// Lista blanca de tablas y estados (nunca se interpola input del usuario)
$tablas = [
    'vacunaciones' => ['tabla' => 'vacunaciones',          'estados' => ['Pendiente', 'Confirmado', 'Cancelado']],
    'spa'          => ['tabla' => 'voluntarios_spa',       'estados' => ['Pendiente', 'Aprobado']],
    'adopciones'   => ['tabla' => 'solicitudes_adopcion',  'estados' => ['Pendiente', 'En entrevista', 'Aprobada', 'Rechazada']],
    'paseos'       => ['tabla' => 'solicitudes_paseo',     'estados' => ['Pendiente', 'Asignado', 'Cancelado']],
    'mascotas'     => ['tabla' => 'mascotas',              'estados' => ['Pendiente', 'Publicada', 'Rechazada']]
];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $tipo = $_GET['tipo'] ?? '';
    if (!isset($tablas[$tipo])) {
        responder(false, 'Tipo no válido.', [], 400);
    }
    $tabla  = $tablas[$tipo]['tabla'];
    $result = $conn->query("SELECT * FROM `$tabla` ORDER BY id DESC");
    if (!$result) {
        responder(false, 'No se pudieron leer los datos.', [], 500);
    }
    responder(true, 'OK', ['datos' => $result->fetch_all(MYSQLI_ASSOC)]);
}

solo_post();
$entrada = json_decode(file_get_contents('php://input'), true);
if (!is_array($entrada)) {
    responder(false, 'Petición inválida.', [], 400);
}

$tipo   = $entrada['tipo'] ?? '';
$id     = (int)($entrada['id'] ?? 0);
$estado = $entrada['estado'] ?? null;
$accion = $entrada['accion'] ?? '';

if (!isset($tablas[$tipo]) || $id < 1) {
    responder(false, 'Datos inválidos.', [], 400);
}
$tabla = $tablas[$tipo]['tabla'];

if ($accion === 'eliminar') {
    $stmt = $conn->prepare("DELETE FROM `$tabla` WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute() && $stmt->affected_rows > 0) {
        responder(true, 'Registro eliminado.');
    }
    responder(false, 'No se encontró el registro.', [], 404);
}

if (!is_string($estado) || !in_array($estado, $tablas[$tipo]['estados'], true)) {
    responder(false, 'Estado no válido.', [], 400);
}

$stmt = $conn->prepare("UPDATE `$tabla` SET estado = ? WHERE id = ?");
$stmt->bind_param("si", $estado, $id);
if ($stmt->execute()) {
    responder(true, 'Estado actualizado a ' . $estado . '.');
}
responder(false, 'No se pudo actualizar.', [], 500);
