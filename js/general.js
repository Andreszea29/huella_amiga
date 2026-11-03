const imagen = document.querySelector('#logo');
if (imagen) {
    imagen.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}
const logoTyC = document.querySelector('#logoTyC');
if (logoTyC) {
    logoTyC.addEventListener('click', () => {
        window.location.href = 'registro.html';
    });
}

function irAInicio(event) {
    event.preventDefault();
    window.location.href = "index.html";
}


window.Huella = window.Huella || {};


Huella.sesion = fetch('../php/sesion.php', { credentials: 'same-origin', cache: 'no-store' })
    .then(r => r.json())
    .catch(() => ({ logueado: false, nombre: '' }));


Huella.pedirLogin = function (mensaje) {
    return Swal.fire({
        icon: 'info',
        title: 'Inicia sesión',
        text: mensaje || 'Necesitas iniciar sesión para continuar.',
        showCancelButton: true,
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Ahora no',
        confirmButtonColor: '#28a745'
    }).then(r => {
        if (r.isConfirmed) window.location.href = 'iniciarsesion.html';
        return r.isConfirmed;
    });
};

document.addEventListener('DOMContentLoaded', () => {
    Huella.sesion.then(s => {
      
        if (s.logueado) {
            const nav = document.querySelector('header nav ul');
            let clase = 'btn btn-secondary';
            document.querySelectorAll('header nav a[href$="iniciarsesion.html"], header nav a[href$="registro.html"]')
                .forEach(a => {
                    if (a.getAttribute('href').endsWith('iniciarsesion.html')) clase = a.className || clase;
                    const li = a.closest('li');
                    if (li) li.remove(); else a.remove();
                });
            if (nav && !nav.querySelector('.cerrar-sesion')) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '../php/cerrar_sesion.php';
                a.className = clase + ' cerrar-sesion';
                a.textContent = 'Cerrar sesión';
                li.appendChild(a);
                nav.appendChild(li);
            }
            return;
        }


        const aviso = document.body.dataset.requiereLogin;
        if (aviso && typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'info',
                title: 'Inicia sesión',
                text: aviso,
                confirmButtonText: 'Iniciar sesión',
                confirmButtonColor: '#28a745',
                showCancelButton: true,
                cancelButtonText: 'Volver al inicio',
                allowOutsideClick: false
            }).then(r => {
                window.location.href = r.isConfirmed ? 'iniciarsesion.html' : 'index.html';
            });
        }
    });
});
