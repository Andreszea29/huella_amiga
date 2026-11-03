// Datos de la mascota elegida en adopcion.html (el servidor es quien la marca como adoptada)
(function () {
    const form = document.getElementById('formAdopcion');
    const p = new URLSearchParams(location.search);
    const nombre = p.get('mascota');
    const tipo = p.get('tipo');

    document.getElementById('mascota-id').value = p.get('id') || '';
    document.getElementById('mascota-nombre').value = nombre || '';
    if (nombre) document.getElementById('mascota-mente').value = nombre;
    if (tipo) {
        const radio = form.querySelector('input[name="tipo_mascota"][value="' + tipo + '"]');
        if (radio) radio.checked = true;
    }
})();
