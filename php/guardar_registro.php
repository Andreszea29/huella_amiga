<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre     = limpiar($conn, 'nombre');
    $email      = limpiar($conn, 'email');
    $telefono   = limpiar($conn, 'telefono');
    $nacimiento = limpiar($conn, 'nacimiento');
    $ciudad     = limpiar($conn, 'ciudad');
    $password   = password_hash($_POST['password'] ?? '', PASSWORD_DEFAULT);

    $existe = $conn->query("SELECT id FROM usuarios WHERE email = '$email'");
    if ($existe->num_rows > 0) {
        terminar("Ya existe una cuenta con ese correo.", "../modules/registro.html");
    }

    $sql = "INSERT INTO usuarios (nombre, email, telefono, nacimiento, ciudad, password)
            VALUES ('$nombre', '$email', '$telefono', '$nacimiento', '$ciudad', '$password')";

    if ($conn->query($sql) === TRUE) {
        terminar("Registro completado. Ya puedes iniciar sesión.", "../modules/iniciarsesion.html");
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
