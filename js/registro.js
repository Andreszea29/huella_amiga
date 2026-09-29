function validarDatos(event) {

  
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const nacimiento = document.getElementById("nacimiento").value;
    const ciudad = document.getElementById("ciudad").value.trim();


    if (!nombre || !email || !telefono || !nacimiento || !ciudad || !password) {

        Swal.fire({
            icon: "error",
            title: "Campos incompletos",
            text: "Por favor llena todos los campos del formulario."
        });

        return;
    }


    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {

        Swal.fire({
            icon: "error",
            title: "Nombre inválido",
            text: "El nombre solo debe contener letras y espacios."
        });

        return;
    }



    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        Swal.fire({
            icon: "error",
            title: "Correo inválido",
            text: "Ingresa un correo electrónico válido."
        });

        return;
    }


    if (!/^\d{7,10}$/.test(telefono)) {

        Swal.fire({
            icon: "error",
            title: "Teléfono inválido",
            text: "El número debe contener entre 7 y 10 números."
        });

        return;
    }


  
    if (!nacimiento) {

        Swal.fire({
            icon: "error",
            title: "Fecha inválida",
            text: "Ingresa una fecha de nacimiento válida."
        });

        return;
    }



    const regexPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!regexPassword.test(password)) {

        Swal.fire({
            icon: "error",
            title: "Contraseña poco segura",
            text: "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
        });

        return;
    }


  
    Swal.fire({
        icon: "success",
        title: "¡Registro completado!",
        text: "Tu información se ha guardado correctamente.",
        confirmButtonText: "Continuar"
    }).then((result) => {

        if (result.isConfirmed) {
            window.location.href = "../index.html";
        }

    });

}



function mostrarPassword() {

    const passInput = document.getElementById("password");

    if (passInput) {
        passInput.type =
            passInput.type === "password"
                ? "text"
                : "password";
    }
}


document.addEventListener("DOMContentLoaded", () => {

    const registroForm = document.getElementById("registroForm");

    if (registroForm) {
        registroForm.addEventListener("submit", validarDatos);
    }

});
