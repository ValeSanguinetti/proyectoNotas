
import API_BASE_URL from './config.js';

document.addEventListener('DOMContentLoaded', function () {
    const botonRegistrar = document.querySelector('.register-submit-button');
    const contenedorMensajes = document.querySelector('.registrar-alumno-register-form'); // El contenedor donde mostrar los mensajes

    // Función para mostrar mensajes
    function mostrarMensaje(tipo, mensaje) {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `mensaje-${tipo}`;
        mensajeDiv.textContent = mensaje;
        // Eliminamos la posición absoluta
        // mensajeDiv.style.position = 'absolute';
        // mensajeDiv.style.top = '10px';
        // mensajeDiv.style.left = '10px';
        // mensajeDiv.style.right = '10px';
        mensajeDiv.style.marginTop = '10px'; // Agregamos un margen superior para separarlo del contenido
        contenedorMensajes.insertBefore(mensajeDiv, contenedorMensajes.firstChild);

        setTimeout(() => {
            mensajeDiv.remove();
        }, 5000);
    }

    botonRegistrar.addEventListener('click', async function () {
        const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
        const ci = document.getElementById('ci').value.trim();
        const cel= document.getElementById('cel').value.trim();

        if (!nombreCompleto || !ci || !cel ) {
            mostrarMensaje('error', 'Por favor completa todos los campos.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/alumnos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombreCompleto: nombreCompleto,
                    ci: ci,
                    cel: cel
                })
            });

            const data = await response.json();

            if (response.ok) {
                mostrarMensaje('exito', 'Alumno registrado exitosamente.');
                document.getElementById('nombreCompleto').value = '';
                document.getElementById('ci').value = '';
                document.getElementById('cel').value='';
            } else {
                mostrarMensaje('error', 'Error al registrar el alumno: ' + (data.error || 'Error desconocido'));
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            mostrarMensaje('error', 'Error al conectar con el servidor.');
        }
    });
});