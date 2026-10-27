
document.addEventListener('DOMContentLoaded', () => {
    const tarjetas = document.querySelectorAll('.pet-card');
    const buscador = document.getElementById('buscador');
    const tags     = document.querySelectorAll('.filter-tags .tag');
    const vacio    = document.getElementById('sin-resultados');
    let filtro     = 'todos';

    function normalizar(t) {
        return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function aplicar() {
        const q = buscador ? normalizar(buscador.value.trim()) : '';
        let visibles = 0;
        tarjetas.forEach(card => {
            const coincideTipo  = filtro === 'todos' || card.dataset.tipo === filtro;
            const coincideTexto = q === '' || normalizar(card.textContent).includes(q);
            const mostrar = coincideTipo && coincideTexto;
            card.hidden = !mostrar;
            if (mostrar) visibles++;
        });
        if (vacio) vacio.hidden = visibles !== 0;
    }

    tags.forEach(tag => tag.addEventListener('click', () => {
        tags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        filtro = tag.dataset.filtro || 'todos';
        aplicar();
    }));
    if (buscador) buscador.addEventListener('input', aplicar);

    // ---- Favoritos (se guardan en el navegador) ----
    let favoritos = [];
    try { favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]'); } catch (_) {}

    tarjetas.forEach(card => {
        const btn    = card.querySelector('.fav-btn');
        const nombre = card.querySelector('h3').textContent.trim();
        if (!btn) return;

        const pintar = () => {
            const activo = favoritos.includes(nombre);
            btn.classList.toggle('active', activo);
            btn.textContent = activo ? '❤️' : '🤍';
        };
        pintar();

        btn.addEventListener('click', () => {
            favoritos = favoritos.includes(nombre)
                ? favoritos.filter(n => n !== nombre)
                : [...favoritos, nombre];
            try { localStorage.setItem('favoritos', JSON.stringify(favoritos)); } catch (_) {}
            pintar();
        });
    });

    aplicar();
});
