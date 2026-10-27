
document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('.table-container tbody');
    if (!tbody) return;

    const TD = 'padding: 12px;';
    const GENERO = { masculino: 'Masculino', femenino: 'Femenino', nobinario: 'No binario', nodecir: 'Prefiero no decir' };
    const EXPERIENCIA = {
        propias: 'Tengo mascotas propias',
        voluntariado: 'He sido voluntario antes',
        ninguna: 'Sin experiencia previa'
    };
    const ESTADOS = {
        Pendiente: 'background:#fff3cd;color:#856404;',
        Aprobado:  'background:#d4edda;color:#155724;'
    };

    function fila(r) {
        const horarios = String(r.horarios || '').split(', ').filter(Boolean).map(h =>
            `<span style="background:#e3f2fd;color:#1565c0;padding:4px 8px;border-radius:4px;font-size:12px;">${esc(h)}</span>`
        ).join(' ');
        const aprobar = r.estado === 'Pendiente'
            ? `<button type="button" data-accion="aprobar" style="background:#28a745;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;">Aprobar</button> `
            : '';

        return `
        <tr style="border-bottom:1px solid #eee;" data-id="${Number(r.id)}" data-nombre="${esc(r.nombre)}">
            <td style="${TD}">#${Number(r.id)}</td>
            <td style="${TD}"><strong>${esc(r.nombre)}</strong></td>
            <td style="${TD}">${esc(GENERO[r.genero] || r.genero)}</td>
            <td style="${TD}">${esc(r.edad)} años</td>
            <td style="${TD}">${esc(EXPERIENCIA[r.experiencia] || r.experiencia)}</td>
            <td style="${TD}">${horarios}</td>
            <td style="${TD}">${esc(fechaCorta(r.creado_en))}</td>
            <td style="${TD}"><span style="${ESTADOS[r.estado] || ''}padding:4px 8px;border-radius:12px;font-weight:bold;font-size:12px;">${esc(r.estado)}</span></td>
            <td style="${TD}">${aprobar}<button type="button" data-accion="eliminar" style="background:#dc3545;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;">Eliminar</button></td>
        </tr>`;
    }

    async function cargar() {
        const r = await adminListar('spa');
        if (!r.ok) {
            tbody.innerHTML = `<tr><td colspan="9" style="${TD}">${esc(r.mensaje)}</td></tr>`;
            return;
        }
        tbody.innerHTML = r.datos.length
            ? r.datos.map(fila).join('')
            : `<tr><td colspan="9" style="${TD}text-align:center;color:#666;">Aún no hay solicitudes.</td></tr>`;
    }

    tbody.addEventListener('click', async (e) => {
        const btn = e.target.closest('button[data-accion]');
        if (!btn) return;
        const tr = btn.closest('tr');
        const id = Number(tr.dataset.id);
        const nombre = tr.dataset.nombre;

        if (btn.dataset.accion === 'aprobar') {
            if (!(await confirmar(`¿Aprobar a ${nombre} como voluntario?`))) return;
            const r = await adminEstado('spa', id, 'Aprobado');
            r.ok ? (await avisar('success', `${nombre} fue aprobado/a.`), cargar())
                 : avisar('error', 'No se pudo aprobar', r.mensaje);
        } else {
            if (!(await confirmar(`¿Eliminar la solicitud de ${nombre}?`, 'Esta acción no se puede deshacer.'))) return;
            const r = await adminEliminar('spa', id);
            r.ok ? (await avisar('success', 'Solicitud eliminada.'), cargar())
                 : avisar('error', 'No se pudo eliminar', r.mensaje);
        }
    });

    cargar();
});
