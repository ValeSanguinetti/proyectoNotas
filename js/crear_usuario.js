
document.addEventListener('DOMContentLoaded', async function () {
    const alumnoSelect = document.getElementById('alumnoId');

    try {
        const response = await fetch('http://localhost:4000/api/alumnos');
        const alumnos = await response.json();

        alumnos.forEach(alumno => {
            const option = document.createElement('option');
            option.value = alumno.id; 
            option.textContent = alumno.nombreCompleto; 
            alumnoSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los alumnos:', error);
        alert('No se pudieron cargar los alumnos.');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector('form');
    const botonRegistrar = document.querySelector('button[type="submit"]');

    // Función que se ejecuta al enviar el formulario
    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario para controlarlo desde JavaScript

        // Obtener los valores del formulario
        const nombreCompleto = document.getElementById('nombre_completo').value;
        const ci = document.getElementById('ci').value;
        const alumnoId = document.getElementById('alumnoId').value;
        const usuario = document.getElementById('usuario').value;
        const contrasena = document.getElementById('contrasena').value;
        const correo = document.getElementById('correo').value;

        // Validaciones (puedes agregar más validaciones si lo deseas)
        if (!nombreCompleto || !ci || !alumnoId || !usuario || !contrasena || !correo) {
            alert('Por favor complete todos los campos.');
            return;
        }

        // Crear el objeto con los datos del formulario
        const datosUsuario = {
            nombreCompleto: nombreCompleto,
            ci: ci,
            alumnoId: alumnoId,
            usuario: usuario,
            contrasena: contrasena,
            correo: correo
        };
        
        fetch('http://localhost:4000/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        })
        .then(response => response.json())
        .then(data => {
            if (data.mensaje) {
                alert('Usuario registrado correctamente');
                // Redirigir o limpiar el formulario si es necesario
                formulario.reset();
            } else {
                alert('Error al registrar el usuario');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al registrar el usuario.');
        });
    });
});
