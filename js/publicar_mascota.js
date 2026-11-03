
document.addEventListener('DOMContentLoaded', () => {
    const form    = document.getElementById('formMascota');
    const caja    = document.getElementById('upload-box');
    const input   = document.getElementById('foto');
    const previa  = document.getElementById('vista-previa');
    if (!form || !caja || !input || !previa) return;

    const MAX_BYTES = 5 * 1024 * 1024;
    const TIPOS     = ['image/jpeg', 'image/png'];

    function aviso(titulo, texto) {
        Swal.fire({ icon: 'warning', title: titulo, text: texto, confirmButtonColor: '#28a745' });
    }

    function pintar(archivo) {
        previa.innerHTML = '';
        if (!archivo) return;

        const url = URL.createObjectURL(archivo);
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Vista previa de la mascota';
        img.style.cssText = 'max-width:200px;max-height:200px;border-radius:12px;object-fit:cover;margin-top:12px;';
        img.onload = () => URL.revokeObjectURL(url);

        const quitar = document.createElement('button');
        quitar.type = 'button';
        quitar.className = 'quitar-foto';
        quitar.textContent = 'Quitar foto';
        quitar.style.cssText = 'display:block;margin:8px auto 0;border:none;background:#dc3545;color:#fff;' +
                               'padding:6px 12px;border-radius:6px;cursor:pointer;';
        quitar.addEventListener('click', (e) => {
            e.stopPropagation();
            input.value = '';
            pintar(null);
        });

        previa.append(img, quitar);
    }

    function asignar(archivo) {
        if (!archivo) return;
        if (!TIPOS.includes(archivo.type)) {
            input.value = '';
            pintar(null);
            return aviso('Formato no permitido', 'La foto debe ser JPG o PNG.');
        }
        if (archivo.size > MAX_BYTES) {
            input.value = '';
            pintar(null);
            return aviso('Foto muy pesada', 'La foto no puede superar los 5 MB.');
        }
        const dt = new DataTransfer();
        dt.items.add(archivo);
        input.files = dt.files;
        pintar(archivo);
    }

    caja.addEventListener('click', () => input.click());
    input.addEventListener('click', e => e.stopPropagation());
    input.addEventListener('change', () => asignar(input.files[0]));

    ['dragenter', 'dragover'].forEach(ev => caja.addEventListener(ev, e => {
        e.preventDefault();
        caja.style.background = '#E8F8E8';
    }));
    ['dragleave', 'drop'].forEach(ev => caja.addEventListener(ev, e => {
        e.preventDefault();
        caja.style.background = '';
    }));
    caja.addEventListener('drop', e => asignar(e.dataTransfer.files[0]));

    form.addEventListener('submit', (e) => {
        if (input.files.length < 1) {
            e.preventDefault();
            e.stopImmediatePropagation();
            aviso('Falta la foto', 'Sube una foto de la mascota para publicarla.');
        }
    });
});
