/*
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
*/




/*
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
*/




import API_BASE_URL from './config.js';

document.addEventListener('DOMContentLoaded', function () {
    const botonRegistrar = document.querySelector('.register-submit-button');
    const contenedorMensajes = document.querySelector('.registrar-alumno-register-form');
    const ciInput = document.getElementById('ci');
    const celInput = document.getElementById('cel');

    function mostrarMensaje(tipo, mensaje) {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `mensaje-${tipo}`;
        mensajeDiv.textContent = mensaje;
        mensajeDiv.style.marginTop = '10px';
        contenedorMensajes.insertBefore(mensajeDiv, contenedorMensajes.firstChild);

        setTimeout(() => {
            mensajeDiv.remove();
        }, 5000);
    }

    function formatCI(value) {
        const cleanedValue = value.replace(/\D/g, '');
        let formattedValue = '';

        if (cleanedValue.length > 0) {
            formattedValue += cleanedValue.substring(0, 1);
        }
        if (cleanedValue.length > 1) {
            formattedValue += '.' + cleanedValue.substring(1, Math.min(4, cleanedValue.length));
        }
        if (cleanedValue.length > 4) {
            formattedValue += '.' + cleanedValue.substring(4, Math.min(7, cleanedValue.length));
        }
        if (cleanedValue.length > 7) {
            formattedValue += '-' + cleanedValue.substring(7, 8);
        }
        return formattedValue;
    }

    function formatCel(value) {
        const cleanedValue = value.replace(/\D/g, '');
        let formattedValue = '';

        for (let i = 0; i < Math.min(9, cleanedValue.length); i++) {
            if (i > 0 && i % 3 === 0) {
                formattedValue += ' ';
            }
            formattedValue += cleanedValue[i];
        }
        return formattedValue;
    }

    ciInput.addEventListener('input', function() {
        const newValue = this.value.replace(/\D/g, '').slice(0, 8);
        this.value = formatCI(newValue);
    });

    celInput.addEventListener('input', function() {
        this.value = formatCel(this.value);
    });

    botonRegistrar.addEventListener('click', async function () {
        const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
        const ci = ciInput.value.trim();
        const cel = celInput.value.trim();

        if (!nombreCompleto || !ci || !cel) {
            mostrarMensaje('error', 'Por favor completa todos los campos.');
            return;
        }

        if (ci.replace(/\D/g, '').length < 8 && cel.replace(/\D/g, '').length < 9) {
            mostrarMensaje('error', 'Campos incompletos');
            return;
        }

        if (ci.replace(/\D/g, '').length < 8) {
            mostrarMensaje('error', 'C.I. Incompleta');
            return;
        }

        if (cel.replace(/\D/g, '').length < 9) {
            mostrarMensaje('error', 'Número de celular incompleto');
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
                mostrarMensaje('exito', data.mensaje || 'Alumno registrado exitosamente.');
                document.getElementById('nombreCompleto').value = '';
                ciInput.value = '';
                celInput.value = '';
            } else {
                mostrarMensaje('error', 'Error al registrar el alumno: ' + (data.mensaje || 'Error desconocido'));
            }
            
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            mostrarMensaje('error', 'Error al conectar con el servidor.');
        }
    });
});
