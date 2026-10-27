
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('lista-adopciones');
    if (!grid) return;

    let datos = [];
    const ICONOS = { perro: '🐕', gato: '🐱', ave: '🐦', hamster: '🐹' };
    const COLORES = {
        'Pendiente': '#f0ad4e', 'En entrevista': '#e67e22', 'Aprobada': '#4CAF50', 'Rechazada': '#d9534f'
    };

    function tarjeta(r) {
        const interes = r.mascota_mente || (r.tipo_mascota ? 'Cualquier ' + r.tipo_mascota : '');
        const casa = `${r.vivienda}${r.patio === 'si' ? ' con patio' : ''} / ${r.personas_hogar} persona(s)`;
        return `
        <div class="plan-card ${r.estado === 'Pendiente' ? 'selected' : ''}" data-id="${Number(r.id)}">
            <div class="plan-header">
                <span class="plan-icon">${ICONOS[r.tipo_mascota] || '🐾'}</span>
                <span class="badge-active" style="background-color:${COLORES[r.estado] || '#999'};color:#fff;">${esc(r.estado)}</span>
            </div>
            <h4>${esc(r.nombre)}</h4>
            <p><strong>Correo:</strong> ${esc(r.correo)}</p>
            <p><strong>Tel:</strong> ${esc(r.telefono)} | ${esc(r.ciudad)}</p>
            <p><strong>Mascota de interés:</strong> ${esc(interes)}</p>
            <span class="plan-price" style="font-size:13px;margin:10px 0;color:#555;">${esc(casa)}</span>
            <div class="admin-card-actions" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:15px;">
                <button type="button" class="day-btn active" style="flex:1;" data-accion="aprobar">Aprobar</button>
                <button type="button" class="day-btn" style="flex:1;" data-accion="entrevista">Entrevista</button>
                <button type="button" class="day-btn" style="flex:1;" data-accion="detalles">Detalles</button>
                <button type="button" class="day-btn" style="flex:1;color:#d9534f;border-color:#f5c6cb;" data-accion="rechazar">Rechazar</button>
            </div>
        </div>`;
    }

    function estadisticas() {
        const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
        set('stat-total', datos.length);
        set('stat-pendientes', datos.filter(d => d.estado === 'Pendiente').length);
        set('stat-aprobadas', datos.filter(d => d.estado === 'Aprobada').length);
    }

    async function cargar() {
        const r = await adminListar('adopciones');
        if (!r.ok) { grid.innerHTML = `<p>${esc(r.mensaje)}</p>`; return; }
        datos = r.datos;
        grid.innerHTML = datos.length ? datos.map(tarjeta).join('') : '<p>Aún no hay solicitudes de adopción.</p>';
        estadisticas();
    }

    function detalles(r) {
        return tablaDetalle([
            ['Nombre', r.nombre], ['Correo', r.correo], ['Teléfono', r.telefono], ['Ciudad', r.ciudad],
            ['Vivienda', r.vivienda], ['Patio o jardín', r.patio], ['Otras mascotas', r.mascotas + (r.otras_mascotas ? ' (' + r.otras_mascotas + ')' : '')],
            ['Personas en el hogar', r.personas_hogar], ['Tipo de mascota', r.tipo_mascota],
            ['Tamaños', r.tamano], ['Edades', r.edad_pref], ['Mascota en mente', r.mascota_mente],
            ['Compromisos', r.compromisos], ['Estado', r.estado], ['Fecha', fechaCorta(r.creado_en)]
        ]);
    }

    const CAMBIOS = { aprobar: 'Aprobada', entrevista: 'En entrevista', rechazar: 'Rechazada' };

    grid.addEventListener('click', async (e) => {
        const btn = e.target.closest('button[data-accion]');
        if (!btn) return;
        const id = Number(btn.closest('.plan-card').dataset.id);
        const registro = datos.find(d => Number(d.id) === id);
        const accion = btn.dataset.accion;

        if (accion === 'detalles') {
            if (typeof Swal !== 'undefined') {
                Swal.fire({ title: 'Solicitud #' + id, html: detalles(registro), width: 600 });
            }
            return;
        }

        const estado = CAMBIOS[accion];
        if (!(await confirmar(`¿Cambiar la solicitud de ${registro.nombre} a "${estado}"?`))) return;

        const r = await adminEstado('adopciones', id, estado);
        if (r.ok) { await avisar('success', r.mensaje); cargar(); }
        else avisar('error', 'No se pudo actualizar', r.mensaje);
    });

    cargar();
});
