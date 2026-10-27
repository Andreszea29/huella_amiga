
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formPaseo');
    if (!form) return;


    document.querySelectorAll('.days-selector .day-btn').forEach(btn => {
        btn.dataset.dia = btn.textContent.replace('✓', '').trim();
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            btn.textContent = btn.dataset.dia + (btn.classList.contains('active') ? ' ✓' : '');
        });
    });


    const planes = document.querySelectorAll('.plan-card[data-plan]');
    const total = document.querySelector('.cost-total .total-price');
    planes.forEach(card => {
        card.addEventListener('click', () => {
            planes.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            total.textContent = '$' + Number(card.dataset.precio).toLocaleString('es-CO') + ' COP';
        });
    });

    form.addEventListener('submit', (e) => {
        const dias = document.querySelectorAll('.days-selector .day-btn.active');
        if (dias.length === 0) {
            e.preventDefault();
            alert('Selecciona al menos un día de paseo.');
            return;
        }
        dias.forEach(b => agregarOculto(form, 'dias[]', b.dataset.dia));
        const plan = document.querySelector('.plan-card.selected');
        agregarOculto(form, 'plan', plan ? plan.dataset.plan : 'Paquete Semanal');
    });

    function agregarOculto(form, nombre, valor) {
        const i = document.createElement('input');
        i.type = 'hidden';
        i.name = nombre;
        i.value = valor;
        form.appendChild(i);
    }
});
