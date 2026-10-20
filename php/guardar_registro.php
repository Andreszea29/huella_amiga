<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre     = trim($_POST['nombre'] ?? '');
    $email      = trim($_POST['email'] ?? '');
    $telefono   = trim($_POST['telefono'] ?? '');
    $nacimiento = $_POST['nacimiento'] ?? '';
    $ciudad     = trim($_POST['ciudad'] ?? '');

    $password   = password_hash($_POST['password'] ?? '', PASSWORD_DEFAULT);
}
?>
