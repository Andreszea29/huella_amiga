
const GRUPOS = {
    formVacunacion: [{ name: 'vacunas[]',        min: 1, msg: 'Selecciona al menos una vacuna.' }],
    formSpa:        [{ name: 'horarios[]',       min: 1, msg: 'Selecciona al menos un horario disponible.' }],
    formPaseo:      [{ name: 'turnos[]',         min: 1, msg: 'Selecciona al menos un turno de paseo.' }],
    formAdopcion:   [{ name: 'compromisos[]',    min: 3, msg: 'Debes aceptar los tres compromisos para continuar.' }],
    formMascota:    [{ name: 'confirmaciones[]', min: 3, msg: 'Debes aceptar las tres confirmaciones para publicar.' }]
};

document.addEventListener('DOMContentLoaded', () => {

   
    const hoy = new Date();
    const hoyISO = hoy.getFullYear() + '-' +
        String(hoy.getMonth() + 1).padStart(2, '0') + '-' +
        String(hoy.getDate()).padStart(2, '0');
    document.querySelectorAll('input[type="date"][data-min-hoy]').forEach(i => {
        i.min = hoyISO;
        if (!i.value || i.value < hoyISO) i.value = hoyISO;
    });

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

    
    document.querySelectorAll('form').forEach(form => {
        const reglas = GRUPOS[form.id];
        if (!reglas) return;
        form.addEventListener('submit', (e) => {
            for (const g of reglas) {
                const marcadas = form.querySelectorAll(`input[name="${g.name}"]:checked`).length;
                if (marcadas < g.min) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    Swal.fire({
                        icon: 'warning',
                        title: 'Revisa el formulario',
                        text: g.msg,
                        confirmButtonColor: '#28a745'
                    });
                    return;
                }
            }
        });
    });
});
