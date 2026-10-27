
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('lista-paseos');
    if (!grid) return;

    let datos = [];
    const TAMANOS = { pequeno: 'Pequeño', mediano: 'Mediano', grande: 'Grande' };
    const COLORES = { Pendiente: '#f0ad4e', Asignado: '#4CAF50', Cancelado: '#d9534f' };

    function tarjeta(r) {
        return `
        <div class="plan-card ${r.estado === 'Pendiente' ? 'selected' : ''}" data-id="${Number(r.id)}">
            <div class="plan-header">
                <span class="plan-icon">🐕</span>
                <span class="badge-active" style="background-color:${COLORES[r.estado] || '#999'};color:#fff;">${esc(r.estado)}</span>
            </div>
            <h4>${esc(r.nombre_mascota)} <small>(${esc(r.raza_mascota)})</small></h4>
            <p>Dueño: ${esc(r.nombre_dueno)} · Tel: ${esc(r.telefono)}</p>
            <p>Zona: ${esc(r.direccion)}</p>
            <span class="plan-price" style="font-size:14px;margin:10px 0;">${esc(r.plan)} · ${esc(r.dias)}</span>
            <div class="admin-card-actions" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:15px;">
                <button type="button" class="day-btn active" style="flex:1;" data-accion="detalles">Detalles</button>
                <button type="button" class="day-btn" style="flex:1;" data-accion="asignar">Asignar</button>
                <button type="button" class="day-btn" style="flex:1;" data-accion="cancelar">Cancelar</button>
                <button type="button" class="day-btn" style="flex:1;color:#d9534f;border-color:#f5c6cb;" data-accion="eliminar">Eliminar</button>
            </div>
        </div>`;
    }

    function estadisticas() {
        const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
        set('stat-total', datos.length);
        set('stat-pendientes', datos.filter(d => d.estado === 'Pendiente').length);
        set('stat-asignados', datos.filter(d => d.estado === 'Asignado').length);
    }

    async function cargar() {
        const r = await adminListar('paseos');
        if (!r.ok) { grid.innerHTML = `<p>${esc(r.mensaje)}</p>`; return; }
        datos = r.datos;
        grid.innerHTML = datos.length ? datos.map(tarjeta).join('') : '<p>Aún no hay solicitudes de paseo.</p>';
        estadisticas();
    }

    grid.addEventListener('click', async (e) => {
        const btn = e.target.closest('button[data-accion]');
        if (!btn) return;
        const id = Number(btn.closest('.plan-card').dataset.id);
        const reg = datos.find(d => Number(d.id) === id);
        const accion = btn.dataset.accion;

        if (accion === 'detalles') {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Solicitud #' + id,
                    width: 600,
                    html: tablaDetalle([
                        ['Dueño', reg.nombre_dueno], ['Teléfono', reg.telefono], ['Mascota', reg.nombre_mascota],
                        ['Raza', reg.raza_mascota], ['Tamaño', TAMANOS[reg.tamano] || reg.tamano],
                        ['Dirección', reg.direccion], ['Días', reg.dias], ['Turnos', reg.turnos],
                        ['Plan', reg.plan], ['Estado', reg.estado], ['Fecha', fechaCorta(reg.creado_en)]
                    ])
                });
            }
            return;
        }

        if (accion === 'eliminar') {
            if (!(await confirmar(`¿Eliminar la solicitud de ${reg.nombre_mascota}?`, 'Esta acción no se puede deshacer.'))) return;
            const r = await adminEliminar('paseos', id);
            r.ok ? (await avisar('success', 'Solicitud eliminada.'), cargar()) : avisar('error', 'No se pudo eliminar', r.mensaje);
            return;
        }

        const estado = accion === 'asignar' ? 'Asignado' : 'Cancelado';
        if (!(await confirmar(`¿Marcar la solicitud de ${reg.nombre_mascota} como "${estado}"?`))) return;
        const r = await adminEstado('paseos', id, estado);
        r.ok ? (await avisar('success', r.mensaje), cargar()) : avisar('error', 'No se pudo actualizar', r.mensaje);
    });

    cargar();
});
