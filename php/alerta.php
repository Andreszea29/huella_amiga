<?php

function alerta($icono, $titulo, $url) {

    echo "
    <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
    <script>
        Swal.fire({
          icon: '$icono',
          title: '$titulo',
          timer: 1500,
          showConfirmButton: false
        }):
    </script>";
    header("Location: $url");
    "



}