// Botones del panel administrativo de citas
document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('.table-container tbody');
    if (!tbody) return;

    const estilos = {
        Pendiente:  'background:#fff3cd;color:#856404;',
        Confirmado: 'background:#d4edda;color:#155724;',
        Cancelado:  'background:#f8d7da;color:#721c24;'
    };

    function pintarEstado(fila, estado) {
        const badge = fila.children[7].querySelector('span');
        badge.textContent = estado;
        badge.setAttribute('style', estilos[estado] +
            'padding:4px 8px;border-radius:12px;font-weight:bold;font-size:12px;');
    }

    function pintarAcciones(fila, estado) {
        const celda = fila.children[8];
        if (estado === 'Confirmado') {
            celda.innerHTML = botonHTML('#007bff', 'Editar') + ' ' + botonHTML('#dc3545', 'Cancelar');
        } else if (estado === 'Cancelado') {
            celda.innerHTML = '<small style="color:#999;">Sin acciones</small>';
        }
    }

    function botonHTML(color, texto) {
        return `<button style="background:${color};color:white;border:none;padding:6px 10px;border-radius:4px;cursor:pointer;margin-bottom:4px;">${texto}</button>`;
    }

    async function actualizarEstado(id, estado) {
        const resp = await fetch('../php/api_citas.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, estado })
        });
        const data = await resp.json();
        if (!data.ok) throw new Error(data.mensaje || 'Error desconocido');
    }

    tbody.addEventListener('click', async (e) => {
        const boton = e.target.closest('button');
        if (!boton) return;

        const fila = boton.closest('tr');
        const id = parseInt(fila.children[0].textContent.replace('#', ''), 10);
        const mascota = fila.children[3].querySelector('strong').textContent;
        const accion = boton.textContent.trim();

        if (accion === 'Editar') {
            alert(`✏️ Edición de la cita #${id} (${mascota}) próximamente.`);
            return;
        }

        const estado = accion === 'Confirmar' ? 'Confirmado' : 'Cancelado';
        const verbo  = accion === 'Confirmar' ? 'confirmar' : 'cancelar';

        if (!confirm(`¿Seguro que deseas ${verbo} la cita de ${mascota}?`)) return;

        try {
            await actualizarEstado(id, estado);
            pintarEstado(fila, estado);
            pintarAcciones(fila, estado);
            alert(estado === 'Confirmado'
                ? `✅ La cita de ${mascota} fue confirmada.`
                : `❌ La cita de ${mascota} fue cancelada.`);
        } catch (err) {
            alert('⚠️ No se pudo actualizar la cita: ' + err.message);
        }
    });
});
