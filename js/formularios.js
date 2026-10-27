
const GRUPOS = {
    formVacunacion: [{ name: 'vacunas[]',        min: 1, msg: 'Selecciona al menos una vacuna.' }],
    formSpa:        [{ name: 'horarios[]',       min: 1, msg: 'Selecciona al menos un horario disponible.' }],
    formPaseo:      [{ name: 'turnos[]',         min: 1, msg: 'Selecciona al menos un turno de paseo.' }],
    formAdopcion:   [{ name: 'compromisos[]',    min: 3, msg: 'Debes aceptar los tres compromisos para continuar.' }],
    formMascota:    [{ name: 'confirmaciones[]', min: 3, msg: 'Debes aceptar las tres confirmaciones para publicar.' }]
};

// Otros scripts pueden registrar aquí un "antes de enviar": (formData, form) => mensajeDeError | null
window.hooksFormulario = window.hooksFormulario || {};

document.addEventListener('DOMContentLoaded', () => {

    // Fechas: no permitir días pasados
    const hoy = new Date();
    const hoyISO = hoy.getFullYear() + '-' +
        String(hoy.getMonth() + 1).padStart(2, '0') + '-' +
        String(hoy.getDate()).padStart(2, '0');
    document.querySelectorAll('input[type="date"][data-min-hoy]').forEach(i => {
        i.min = hoyISO;
        if (!i.value || i.value < hoyISO) i.value = hoyISO;
    });

    // Resaltar la opción elegida en tarjetas de radio/checkbox
    const contenedores = '.radio-option, .radio-card, .shift-card, .radio-item, .checkbox-item';
    function sincronizar(input) {
        if (input.type === 'radio') {
            document.querySelectorAll(`input[type="radio"][name="${input.name}"]`).forEach(r => {
                const caja = r.closest(contenedores);
                if (caja) caja.classList.toggle('active', r.checked);
            });
        } else {
            const caja = input.closest(contenedores);
            if (caja) caja.classList.toggle('active', input.checked);
        }
    }
    document.querySelectorAll(contenedores).forEach(c => {
        c.querySelectorAll('input').forEach(i => {
            sincronizar(i);
            i.addEventListener('change', () => sincronizar(i));
        });
    });

    // Envío
    document.querySelectorAll('form[data-ajax]').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            for (const g of (GRUPOS[form.id] || [])) {
                const marcadas = form.querySelectorAll(`input[name="${g.name}"]:checked`).length;
                if (marcadas < g.min) {
                    avisar('warning', 'Revisa el formulario', g.msg);
                    return;
                }
            }

            const datos = new FormData(form);
            const hook = window.hooksFormulario[form.id];
            if (hook) {
                const error = hook(datos, form);
                if (error) {
                    avisar('warning', 'Revisa el formulario', error);
                    return;
                }
            }

            const boton = document.querySelector(`button[type="submit"][form="${form.id}"]`) ||
                          form.querySelector('button[type="submit"]');
            const textoOriginal = boton ? boton.textContent : '';
            if (boton) { boton.disabled = true; boton.textContent = 'Enviando...'; }

            const r = await enviarDatos(form.getAttribute('action'), datos);

            if (boton) { boton.disabled = false; boton.textContent = textoOriginal; }

            if (r.ok) {
                await avisar('success', '¡Listo!', r.mensaje);
                form.reset();
                if (r.redirect) window.location.href = r.redirect;
            } else {
                avisar('error', 'No se pudo enviar', r.mensaje);
            }
        });
    });
});
