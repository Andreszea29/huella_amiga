<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email    = limpiar($conn, 'email');
    $password = $_POST['password'] ?? '';

    $resultado = $conn->query("SELECT * FROM usuarios WHERE email = '$email'");
    $usuario = $resultado ? $resultado->fetch_assoc() : null;

    // La contraseña está guardada con hash, por eso se usa password_verify
    if ($usuario && password_verify($password, $usuario['password'])) {
        session_regenerate_id(true);
        $_SESSION['usuario_id'] = (int)$usuario['id'];
        $_SESSION['nombre'] = $usuario['nombre'];
        terminar("¡Bienvenido, " . $usuario['nombre'] . "!", "../modules/index.html");
    } else {
        terminar("Correo o contraseña incorrectos.", "back", "error");
    }
}
?>
