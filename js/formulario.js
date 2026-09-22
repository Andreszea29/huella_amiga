function adoptarMascota(nombreMascota) {
    localStorage.setItem('mascotaElegida', nombreMascota);
    window.location.href = "formulario-adopcion.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const inputMascota = document.getElementById('mascota-mente');

    if (inputMascota) {
        const mascotaGuardada = localStorage.getItem('mascotaElegida');
        if (mascotaGuardada) {
            inputMascota.value = mascotaGuardada;
            localStorage.removeItem('mascotaElegida');
        }
    }
});