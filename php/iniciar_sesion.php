<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

   $sql = "SELECT * FROM usuarios WHERE email = '$email' AND password = '$password'";
    $resultado = $conn->query($sql);

    if ($resultado->num_rows > 0) {
    echo "Bienvenido, inicio de sesión correcto.";
    } else {
    echo "Correo o contraseña incorrectos.";
    }
}
?>
