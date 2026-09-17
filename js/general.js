const imagen = document.querySelector('#logo'); 
if (imagen) {
    imagen.addEventListener('click', () => {
        window.location.href = '/index.html';
    });
}
const logoTyC = document.querySelector('#logoTyC');
if (logoTyC) {
    logoTyC.addEventListener('click', () =>{
        window.location.href = '/modules/registro.html';
    });
}