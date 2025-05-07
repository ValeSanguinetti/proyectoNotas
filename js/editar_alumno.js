/*
import API_BASE_URL from './config.js';
document.addEventListener('DOMContentLoaded', async function () {
    const botonEditar = document.querySelector('.form-edit');

    // Verificar que el botón existe
    if (!botonEditar) {
        console.error('No se encontró el botón de edición (.form-edit)');
        return;
    }

    // Obtener ID del alumno desde la URL
    const params = new URLSearchParams(window.location.search);
    const alumnoId = params.get('id');

    if (!alumnoId) {
        alert('ID de alumno no especificado en la URL');
        return;
    }

    // Cargar los datos actuales del alumno
    try {
        const response = await fetch(`${API_BASE_URL}/api/alumnos/${alumnoId}`);
        const alumno = await response.json();

        if (response.ok) {
            document.getElementById('ci').value = alumno.ci || '';
            document.getElementById('nombreCompleto').value = alumno.nombreCompleto || '';
        } else {
            alert('No se pudo cargar los datos del alumno.');
        }
    } catch (error) {
        console.error('Error al obtener el alumno:', error);
        alert('Error al conectar con el servidor al obtener el alumno.');
    }

    // Evento del botón Editar
    botonEditar.addEventListener('click', async function () {
        const ci = document.getElementById('ci').value.trim();
        const nombreCompleto = document.getElementById('nombreCompleto').value.trim();

        if (!ci || !nombreCompleto) {
            alert('Por favor completa todos los campos.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/alumnos/editar/${alumnoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ci, nombreCompleto })
            });

            if (response.ok) {
                alert('Alumno actualizado correctamente.');
                window.location.href = 'Listado_De_Alumnos.html';
            } else {
                const errorData = await response.json();
                alert('Error al actualizar el alumno: ' + (errorData.mensaje || 'Error desconocido'));
            }
        } catch (error) {
            console.error('Error al actualizar:', error);
            alert('Error de red al actualizar el alumno.');
        }
    });
});
*/





/*
import API_BASE_URL from './config.js';
document.addEventListener('DOMContentLoaded', async function () {
    const botonEditar = document.querySelector('.form-edit');
    const contenedorMensajes = document.querySelector('.registrar-alumno-register-form'); // El contenedor donde mostrar los mensajes

    // Función para mostrar mensajes
    function mostrarMensaje(tipo, mensaje) {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `mensaje-${tipo}`;
        mensajeDiv.textContent = mensaje;
        mensajeDiv.style.position = 'absolute';
        mensajeDiv.style.top = '10px'; // Ajusta la distancia desde la parte superior según necesites
        mensajeDiv.style.left = '10px'; // Ajusta la distancia desde la izquierda si es necesario
        mensajeDiv.style.right = '10px'; // Para que ocupe el ancho del padding
        contenedorMensajes.insertBefore(mensajeDiv, contenedorMensajes.firstChild); // Insertar al principio del formulario

        // Opcional: Eliminar el mensaje después de unos segundos
        setTimeout(() => {
            mensajeDiv.remove();
        }, 5000); // Eliminar después de 5 segundos
    }

    // Verificar que el botón existe
    if (!botonEditar) {
        console.error('No se encontró el botón de edición (.form-edit)');
        return;
    }

    // Obtener ID del alumno desde la URL
    const params = new URLSearchParams(window.location.search);
    const alumnoId = params.get('id');

    if (!alumnoId) {
        mostrarMensaje('alerta', 'ID de alumno no especificado en la URL');
        return;
    }

    // Cargar los datos actuales del alumno
    try {
        const response = await fetch(`${API_BASE_URL}/api/alumnos/${alumnoId}`);
        const alumno = await response.json();

        if (response.ok) {
            document.getElementById('ci').value = alumno.ci || '';
            document.getElementById('nombreCompleto').value = alumno.nombreCompleto || '';
            
            document.getElementById('cel').value = alumno.cel || '';
            
        } else {
            mostrarMensaje('error', 'No se pudieron cargar los datos del alumno.');
        }
    } catch (error) {
        console.error('Error al obtener el alumno:', error);
        mostrarMensaje('error', 'Error al conectar con el servidor al obtener el alumno.');
    }

    // Evento del botón Editar
    botonEditar.addEventListener('click', async function () {
        const ci = document.getElementById('ci').value.trim();
        const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
        const cel= document.getElementById('cel').value.trim();

        if (!ci || !nombreCompleto || !cel) {
            mostrarMensaje('error', 'Por favor completa todos los campos.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/alumnos/editar/${alumnoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ci, nombreCompleto, cel })
            });

            if (response.ok) {
                mostrarMensaje('exito', 'Alumno actualizado correctamente.');
                setTimeout(() => {
                    window.location.href = 'Listado_De_Alumnos.html';
                }, 1500); // Redirigir después de un breve mensaje de éxito
            } else {
                const errorData = await response.json();
                mostrarMensaje('error', 'Error al actualizar el alumno: ' + (errorData.mensaje || 'Error desconocido'));
            }
        } catch (error) {
            console.error('Error al actualizar:', error);
            mostrarMensaje('error', 'Error de red al actualizar el alumno.');
        }
    });
});
*/




import API_BASE_URL from './config.js';

document.addEventListener('DOMContentLoaded', async function () {
    const botonEditar = document.querySelector('.form-edit');
    const contenedorMensajes = document.querySelector('.registrar-alumno-register-form');

    function mostrarMensaje(tipo, mensaje) {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `mensaje-${tipo}`;
        mensajeDiv.textContent = mensaje;
        mensajeDiv.style.position = 'absolute';
        mensajeDiv.style.top = '10px';
        mensajeDiv.style.left = '10px';
        mensajeDiv.style.right = '10px';
        contenedorMensajes.insertBefore(mensajeDiv, contenedorMensajes.firstChild);

        setTimeout(() => {
            mensajeDiv.remove();
        }, 4000);
    }

    if (!botonEditar) {
        console.error('No se encontró el botón de edición (.form-edit)');
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const alumnoId = params.get('id');

    if (!alumnoId) {
        mostrarMensaje('alerta', 'ID de alumno no especificado en la URL');
        return;
    }

    const ciInput = document.getElementById('ci');
    const celInput = document.getElementById('cel');

    function formatCI(value) {
        const cleanedValue = value.replace(/\D/g, '').slice(0, 8);
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
        const cleanedValue = value.replace(/\D/g, '').slice(0, 9);
        let formattedValue = '';

        for (let i = 0; i < cleanedValue.length; i++) {
            if (i > 0 && i % 3 === 0) {
                formattedValue += ' ';
            }
            formattedValue += cleanedValue[i];
        }
        return formattedValue;
    }

    ciInput.addEventListener('input', function () {
        this.value = formatCI(this.value);
    });

    celInput.addEventListener('input', function () {
        this.value = formatCel(this.value);
    });

    try {
        const response = await fetch(`${API_BASE_URL}/api/alumnos/${alumnoId}`);
        const alumno = await response.json();

        if (response.ok) {
            document.getElementById('ci').value = formatCI(alumno.ci) || '';
            document.getElementById('nombreCompleto').value = alumno.nombreCompleto || '';
            document.getElementById('cel').value = formatCel(alumno.cel) || '';
        } else {
            mostrarMensaje('error', 'No se pudieron cargar los datos del alumno.');
        }
    } catch (error) {
        console.error('Error al obtener el alumno:', error);
        mostrarMensaje('error', 'Error al conectar con el servidor al obtener el alumno.');
    }

    botonEditar.addEventListener('click', async function () {
        const ci = ciInput.value.trim();
        const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
        const cel = celInput.value.trim();

        if (!ci || !nombreCompleto || !cel) {
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
            const response = await fetch(`${API_BASE_URL}/api/alumnos/editar/${alumnoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ci, nombreCompleto, cel })
            });

            if (response.ok) {
                mostrarMensaje('exito', 'Alumno actualizado correctamente.');
                setTimeout(() => {
                    window.location.href = 'Listado_De_Alumnos.html';
                }, 1500);
            } else {
                const errorData = await response.json();
                mostrarMensaje('error', 'Error al actualizar el alumno: ' + (errorData.mensaje || 'Error desconocido'));
            }
        } catch (error) {
            console.error('Error al actualizar:', error);
            mostrarMensaje('error', 'Error de red al actualizar al alumno.');
        }
    });
});
