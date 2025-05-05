
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
            const response = await fetch('http://localhost:4000/api/login', {
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