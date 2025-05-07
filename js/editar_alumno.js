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