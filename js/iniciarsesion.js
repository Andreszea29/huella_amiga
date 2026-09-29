function validarDatos(event) {
    // 1. Detener el envío/recarga del formulario obligatoriamente
    if (event) {
        event.preventDefault();
    }

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // 2. Validar que los campos no estén vacíos
    if (!email || !password) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Campos incompletos",
            text: "Por favor llena todos los campos.",
            showConfirmButton: false,
            timer: 1800
        });
        return; // Detiene la ejecución, NO redirige
    }

    // 3. Validar formato de correo electrónico
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        Swal.fire({
            icon: "error",
            title: "Correo inválido",
            text: "Ingresa un correo electrónico válido (ejemplo@dominio.com)."
        });
        return; // Detiene la ejecución, NO redirige
    }

    // 4. Validar formato de contraseña (Mínimo 8 caracteres, mayúscula, minúscula, número y carácter especial)
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!regexPassword.test(password)) {
        Swal.fire({
            icon: "error",
            title: "Contraseña insegura",
            text: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
        });
        return; // Detiene la ejecución, NO redirige
    }

    // 5. SI TODO ESTÁ CORRECTO: Muestra éxito y redirige
    Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Inicio de sesión exitoso!",
        showConfirmButton: false,
        timer: 1500
    }).then(() => {
        // Redirige únicamente cuando la validación pasó exitosamente
        window.location.href = "../index.html";
    });
}

// Escuchar el evento submit del formulario
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", validarDatos);
    }
});

// Función para mostrar/ocultar contraseña
function mostrarPassword() {
    const passInput = document.getElementById("password");
    if (passInput) {
        passInput.type = passInput.type === "password" ? "text" : "password";
    }
}

