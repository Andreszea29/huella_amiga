<?php
require("conexion.php");
header('Content-Type: application/json; charset=utf-8');


$datos  = json_decode(file_get_contents('php://input'), true);
$id     = (int)($datos['id'] ?? 0);
$estado = $conn->real_escape_string($datos['estado'] ?? '');

if ($id > 0 && in_array($estado, ['Pendiente', 'Confirmado', 'Cancelado'])) {
    if ($conn->query("UPDATE vacunaciones SET estado = '$estado' WHERE id = $id")) {
        echo json_encode(['ok' => true]);
        exit;
    }
}
echo json_encode(['ok' => false, 'mensaje' => 'No se pudo actualizar la cita']);
?>
