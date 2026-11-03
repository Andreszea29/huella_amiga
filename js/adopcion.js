const API = '../php/guardar_mascota.php';
const grid = document.getElementById('pets-grid');
const buscador = document.getElementById('buscador');
const sinResultados = document.getElementById('sin-resultados');
const EMOJI = { perro:'🐕', gato:'🐱', ave:'🦜', hamster:'🐹', otro:'🐾' };
let filtroActual = 'todos';

function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, c =>
        ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function leer(clave, defecto) {
    try { return JSON.parse(localStorage.getItem(clave)) ?? defecto; } catch (e) { return defecto; }
}
function guardar(clave, valor) {
    try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) {}
}

const avisoAdoptada = new URLSearchParams(location.search).get('adoptada');
if (avisoAdoptada) {
    const lista = leer('mascotasAdoptadas', []);
    if (!lista.includes(avisoAdoptada)) lista.push(avisoAdoptada);
    guardar('mascotasAdoptadas', lista);
    history.replaceState(null, '', location.pathname);
}
const adoptadas = leer('mascotasAdoptadas', []);
grid.querySelectorAll('.pet-card').forEach(card => {
    if (adoptadas.includes(card.querySelector('h3').textContent)) card.remove();
});

let favoritos = leer('favoritos', null);
if (favoritos === null) {
    favoritos = [...grid.querySelectorAll('.pet-card')]
        .filter(c => c.querySelector('.fav-btn.active'))
        .map(c => c.querySelector('h3').textContent);
    guardar('favoritos', favoritos);
}
function pintarFavorito(card) {
    const btn = card.querySelector('.fav-btn');
    const activo = favoritos.includes(card.querySelector('h3').textContent);
    btn.classList.toggle('active', activo);
    btn.textContent = activo ? '❤️' : '🤍';
}
grid.querySelectorAll('.pet-card').forEach(pintarFavorito);

function crearTarjeta(m) {
    const imagen = m.imagen
        ? `<img src="../imagenes/${esc(m.imagen)}" alt="${esc(m.nombre_mascota)} - ${esc(m.raza_mascota)}">`
        : `<div style="height:100%;min-height:220px;display:flex;align-items:center;justify-content:center;font-size:80px;background:#f3f3f3;">${EMOJI[m.tipo_mascota] || '🐾'}</div>`;
    const div = document.createElement('div');
    div.className = 'pet-card';
    div.dataset.tipo = m.tipo_mascota;
    div.dataset.id = m.id;
    div.dataset.busqueda = [m.nombre_mascota, m.raza_mascota, m.edad_mascota, m.temperamento].join(' ').toLowerCase();
    div.innerHTML = `
        <div class="card-image">
            <button type="button" class="fav-btn">🤍</button>
            ${imagen}
        </div>
        <div class="card-info">
            <div class="card-header">
                <div>
                    <h3>${esc(m.nombre_mascota)}</h3>
                    <p class="breed">${esc(m.raza_mascota)}</p>
                </div>
                <span class="age-badge">${esc(m.edad_mascota)}</span>
            </div>
            <button type="button" class="btn-adopt">Adoptar</button>
        </div>`;
    pintarFavorito(div);
    return div;
}

function aplicarFiltros() {
    const texto = buscador.value.trim().toLowerCase();
    let visibles = 0;
    grid.querySelectorAll('.pet-card').forEach(card => {
        const okTipo = filtroActual === 'todos' || card.dataset.tipo === filtroActual;
        const contenido = card.dataset.busqueda || card.textContent.toLowerCase();
        const mostrar = okTipo && contenido.includes(texto);
        card.style.display = mostrar ? '' : 'none';
        if (mostrar) visibles++;
    });
    sinResultados.hidden = visibles > 0;
}


async function cargarPublicadas() {
    try {
        const r = await fetch(API + '?accion=listar');
        const mascotas = await r.json();
        grid.querySelectorAll('.pet-card[data-id]').forEach(c => c.remove());
        mascotas.forEach(m => grid.prepend(crearTarjeta(m)));
    } catch (e) {
        console.error('No se pudieron cargar las mascotas publicadas', e);
    }
    aplicarFiltros();
}

grid.addEventListener('click', async e => {
    const fav = e.target.closest('.fav-btn');
    if (fav) {
        const card = fav.closest('.pet-card');
        const nombre = card.querySelector('h3').textContent;
        favoritos = favoritos.includes(nombre) ? favoritos.filter(n => n !== nombre) : [...favoritos, nombre];
        guardar('favoritos', favoritos);
        pintarFavorito(card);
        return;
    }

    const btn = e.target.closest('.btn-adopt');
    if (!btn) return;


    const sesion = await Huella.sesion;
    if (!sesion.logueado) {
        Huella.pedirLogin('Para adoptar una mascota necesitas iniciar sesión.');
        return;
    }

    const card = btn.closest('.pet-card');
    const params = new URLSearchParams({
        mascota: card.querySelector('h3').textContent,
        tipo: card.dataset.tipo || ''
    });
    if (card.dataset.id) params.set('id', card.dataset.id);
    window.location.href = 'formulario-adopcion.html?' + params.toString();
});

const cta = document.querySelector('.btn-cta');
if (cta) {
    cta.addEventListener('click', async e => {
        e.preventDefault();
        const sesion = await Huella.sesion;
        if (!sesion.logueado) {
            Huella.pedirLogin('Para solicitar una adopción necesitas iniciar sesión.');
        } else {
            window.location.href = cta.getAttribute('href');
        }
    });
}

document.querySelectorAll('.filter-tags .tag').forEach(tag => {
    tag.addEventListener('click', () => {
        document.querySelectorAll('.filter-tags .tag').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        filtroActual = tag.dataset.filtro;
        aplicarFiltros();
    });
});
buscador.addEventListener('input', aplicarFiltros);

cargarPublicadas();
