const imagen = document.querySelector('#logo'); 
if (imagen) {
    imagen.addEventListener('click', () => {
        window.location.href = '/index.html';
    });
}