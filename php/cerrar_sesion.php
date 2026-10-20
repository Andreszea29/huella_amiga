<?php
require("conexion.php");
iniciar_sesion();
$_SESSION = [];
session_destroy();
responder(true, 'Sesión cerrada.', ['redirect' => 'iniciarsesion.html']);
