function validarDatos(event) {
    // Prevent default para evitar la recarga de página al enviar
    if (event) {
        event.preventDefault();
    }

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const nacimiento = document.getElementById('nacimiento').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();

    // 1. Validar campos vacíos
    if (!nombre || !email || !telefono || !nacimiento || !ciudad || !password) {
        Swal.fire({
            icon: "error",
            title: "Campos incompletos",
            text: "Por favor llena todos los campos del formulario."
        });
        return; // Detiene la ejecución
    }

    // 2. Validar Nombre (Permite letras y espacios para nombres compuestos)
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        Swal.fire({
            icon: "error",
            title: "Nombre inválido",
            text: "El nombre solo debe contener letras y espacios."
        });
        return;
    }

    // 3. Validar Correo Electrónico
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        Swal.fire({
            icon: "error",
            title: "Correo inválido",
            text: "Ingresa un correo electrónico válido."
        });
        return;
    }

    // 4. Validar Teléfono (Solo números, entre 7 y 10 dígitos)
    if (!/^\d{7,10}$/.test(telefono)) {
        Swal.fire({
            icon: "error",
            title: "Teléfono inválido",
            text: "El número de teléfono debe contener solo números (7 a 10 dígitos)."
        });
        return;
    }

    // 5. Validar Fecha de Nacimiento
    if (!nacimiento) {
        Swal.fire({
            icon: "error",
            title: "Fecha inválida",
            text: "Ingresa una fecha de nacimiento válida."
        });
        return;
    }

    // 6. Validar Contraseña (Mínimo 8 caracteres, Mayúscula, Minúscula, Número y Carácter Especial)
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!regexPassword.test(password)) {
        Swal.fire({
            icon: "error",
            title: "Contraseña poco segura",
            text: "La contraseña debe tener mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial."
        });
        return;
    }

    // 7. ÉXITO: Todos los campos son válidos
    Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Registro completado!",
        text: "Tu información se ha guardado correctamente.",
        showConfirmButton: false,
        timer: 1800
    }).then(() => {
        // Redirige ÚNICAMENTE cuando todas las validaciones son exitosas
        window.location.href = "../index.html";
    });
}

// Mostrar / Ocultar contraseña
function mostrarPassword() {
    const passInput = document.getElementById("password");
    if (passInput) {
        passInput.type = passInput.type === "password" ? "text" : "password";
    }
}

// Asignar el evento submit al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    const registroForm = document.getElementById("registroForm");
    if (registroForm) {
        registroForm.addEventListener("submit", validarDatos);
    }
});