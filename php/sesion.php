<?php
require("conexion.php");
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
echo json_encode([
    'logueado' => esta_logueado(),
    'nombre'   => $_SESSION['nombre'] ?? ''
]);
