/*
import API_BASE_URL from './config.js';

document.addEventListener('DOMContentLoaded', function () {
    const botonIngresar = document.querySelector('.login-submit-button');

    botonIngresar.addEventListener('click', async function () {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !password) {
            alert('Por favor completa todos los campos.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario: username,
                    contrasena: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('mensaje').style.color = 'green';
                document.getElementById('mensaje').textContent = data.mensaje;
              // Guardar el rol
localStorage.setItem('rol', data.rol);

// Solo guardar alumno_id si no es admin
if (data.rol === 'user' && data.alumno_id) {
localStorage.setItem('alumno_id', data.alumno_id);
}

                if (data.rol === 'user') {
window.location.href = './Ventana_Inicio_Comun.html';  // Redirigir a la página del usuario
} else if (data.rol === 'admin') {
window.location.href = './Ventana_Inicio_Admin.html';  // Redirigir a la página de inicio de admin
}

            } else {
                document.getElementById('mensaje').style.color = 'red';
                document.getElementById('mensaje').textContent = data.mensaje;
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            document.getElementById('mensaje').style.color = 'red';
            document.getElementById('mensaje').textContent = 'Error al conectar con el servidor.';
        }
    });
});
*/
import API_BASE_URL from './config.js';

document.addEventListener('DOMContentLoaded', function () {
    const botonIngresar = document.querySelector('.login-submit-button');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const mensajeElement = document.getElementById('mensaje'); // Obtenemos el elemento mensaje

    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    function mostrarMensaje(texto, tipo) {
        mensajeElement.textContent = texto;
        mensajeElement.className = `mensaje ${tipo}`; // Añadimos clases para el estilo
        setTimeout(() => {
            mensajeElement.textContent = '';
            mensajeElement.className = 'mensaje'; // Removemos las clases de estilo
        }, 3000);
    }

    botonIngresar.addEventListener('click', async function () {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !password) {
            mostrarMensaje('Por favor completa todos los campos.', 'alerta');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario: username,
                    contrasena: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                mostrarMensaje(data.mensaje, 'correcto');
                localStorage.setItem('rol', data.rol);

                if (data.rol === 'user' && data.alumno_id) {
                    localStorage.setItem('alumno_id', data.alumno_id);
                }

                if (data.rol === 'user') {
                    window.location.href = './Ventana_Inicio_Comun.html';
                } else if (data.rol === 'admin') {
                    window.location.href = './Ventana_Inicio_Admin.html';
                }

            } else {
                mostrarMensaje(data.mensaje, 'error');
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            mostrarMensaje('Error al conectar con el servidor.', 'error');
        }
    });
});