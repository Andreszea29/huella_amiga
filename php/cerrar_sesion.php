<?php
require("conexion.php");
$_SESSION = [];
session_destroy();
terminar("Sesión cerrada. ¡Hasta pronto!", "../modules/index.html");
