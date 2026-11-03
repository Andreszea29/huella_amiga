<?php
// Muestra una alerta SweetAlert2 y luego redirige.
// $icono: success | error | warning | info | question
// $url:   página destino, o "back" para volver al formulario sin perder lo escrito.
function alerta($icono, $titulo, $url) {
    $flags  = JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP;
    $icono  = json_encode($icono, $flags);
    $titulo = json_encode($titulo, $flags);
    $salida = ($url === 'back') ? 'history.back()' : 'window.location.href = ' . json_encode($url, $flags);
    $timer  = ($icono === '"success"') ? 'timer: 2500, timerProgressBar: true,' : '';

    echo "<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <title>Huellas</title>
    <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
</head>
<body>
<script>
    Swal.fire({
        icon: $icono,
        title: $titulo,
        $timer
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#28a745',
        allowOutsideClick: false
    }).then(() => { $salida; });
</script>
</body>
</html>";
    exit;
}
