// ===============================================================
// Subida de fotos (1 a 5, JPG/PNG, máx. 5 MB) con vista previa
// ===============================================================
document.addEventListener('DOMContentLoaded', () => {
    const caja   = document.querySelector('.upload-box');
    const input  = document.getElementById('fotos');
    const lista  = document.getElementById('lista-fotos');
    if (!caja || !input || !lista) return;

    const MAX_FOTOS = 5;
    const MAX_BYTES = 5 * 1024 * 1024;
    const TIPOS     = ['image/jpeg', 'image/png'];
    let archivos    = [];

    function sincronizarInput() {
        const dt = new DataTransfer();
        archivos.forEach(f => dt.items.add(f));
        input.files = dt.files;
    }

    function pintar() {
        lista.innerHTML = '';
        archivos.forEach((f, i) => {
            const item = document.createElement('div');
            item.style.cssText = 'position:relative;width:80px;height:80px;';

            const img = document.createElement('img');
            img.src = URL.createObjectURL(f);
            img.alt = f.name;
            img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:8px;';
            img.onload = () => URL.revokeObjectURL(img.src);

            const quitar = document.createElement('button');
            quitar.type = 'button';
            quitar.textContent = '×';
            quitar.setAttribute('aria-label', 'Quitar foto');
            quitar.style.cssText = 'position:absolute;top:-6px;right:-6px;width:22px;height:22px;border:none;' +
                                   'border-radius:50%;background:#dc3545;color:#fff;cursor:pointer;line-height:1;';
            quitar.addEventListener('click', (e) => {
                e.stopPropagation();
                archivos.splice(i, 1);
                sincronizarInput();
                pintar();
            });

            item.append(img, quitar);
            lista.appendChild(item);
        });
    }

    function agregar(nuevos) {
        for (const f of nuevos) {
            if (!TIPOS.includes(f.type)) {
                avisar('warning', 'Formato no permitido', `"${f.name}" no es JPG ni PNG.`);
                continue;
            }
            if (f.size > MAX_BYTES) {
                avisar('warning', 'Foto muy pesada', `"${f.name}" supera los 5 MB.`);
                continue;
            }
            if (archivos.length >= MAX_FOTOS) {
                avisar('warning', 'Máximo 5 fotos', 'Quita alguna foto para agregar otra.');
                break;
            }
            archivos.push(f);
        }
        sincronizarInput();
        pintar();
    }

    caja.addEventListener('click', () => input.click());
    input.addEventListener('click', e => e.stopPropagation());
    input.addEventListener('change', () => {
        const elegidos = [...input.files];
        archivos = archivos.slice();            // conserva las anteriores
        agregar(elegidos.filter(f => !archivos.some(a => a.name === f.name && a.size === f.size)));
    });

    ['dragenter', 'dragover'].forEach(ev => caja.addEventListener(ev, e => {
        e.preventDefault();
        caja.style.background = '#E8F8E8';
    }));
    ['dragleave', 'drop'].forEach(ev => caja.addEventListener(ev, e => {
        e.preventDefault();
        caja.style.background = '';
    }));
    caja.addEventListener('drop', e => agregar([...e.dataTransfer.files]));

    // Validar mínimo 1 foto antes de enviar
    window.hooksFormulario = window.hooksFormulario || {};
    window.hooksFormulario.formMascota = () =>
        archivos.length < 1 ? 'Sube al menos una foto de la mascota.' : null;
});
