function validarDatos(event) {

    if (event) {
        event.preventDefault();
    }

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();


    if (!email || !password) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Campos incompletos",
            text: "Por favor llena todos los campos.",
            showConfirmButton: false,
            timer: 1800
        });
        return; 
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        Swal.fire({
            icon: "error",
            title: "Correo inválido",
            text: "Ingresa un correo electrónico válido (ejemplo@dominio.com)."
        });
        return; 
    }

    
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!regexPassword.test(password)) {
        Swal.fire({
            icon: "error",
            title: "Contraseña insegura",
            text: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
        });
        return; 
    }

    event.target.submit();
}


document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", validarDatos);
    }
});


function mostrarPassword() {
    const passInput = document.getElementById("password");
    if (passInput) {
        passInput.type = passInput.type === "password" ? "text" : "password";
    }
}

