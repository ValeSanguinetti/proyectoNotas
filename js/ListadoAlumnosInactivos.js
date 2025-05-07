/*
import API_BASE_URL from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/alumnos/inactivos`);
        const alumnosInactivos = await response.json();

        const tablaBodyInactivos = document.getElementById('tabla-body-inactivos');
        tablaBodyInactivos.innerHTML = '';

        alumnosInactivos.forEach(alumno => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${alumno.ci}</td>
                <td>${alumno.nombreCompleto}</td>
                <td>
                    <button class="btn-activar" data-id="${alumno.id}">Activar</button>
                </td>
            `;
            tablaBodyInactivos.appendChild(fila);
        });

        // Agregar event listeners para los botones de "Activar" (si los agregas)
        const botonesActivar = document.querySelectorAll('.btn-activar');
        botonesActivar.forEach(boton => {
            boton.addEventListener('click', async () => {
                const id = boton.dataset.id;
                await activarAlumno(id); // ✅ Llama a la función de activación
            });
        });

    } catch (error) {
        console.error('Error al obtener los alumnos inactivos:', error);
        alert('No se pudieron cargar los alumnos inactivos.');
    }
});



// Función para activar un alumno (PUT)
const activarAlumno = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/alumnos/${id}/activar`, {
            method: 'PUT',
        });

        if (response.ok) {
            console.log(`Alumno con ID ${id} activado correctamente.`);
            await cargarAlumnosInactivos(); // Recargar la tabla de inactivos
        } else if (response.status === 404) {
            const data = await response.json();
            alert(data.mensaje);
        } else {
            console.error('Error al activar el alumno:', response.status);
            alert('Error al activar el alumno.');
        }
    } catch (error) {
        console.error('Error de red al activar el alumno:', error);
        alert('Error de red al intentar activar el alumno.');
    }
};

// Función para recargar la lista de alumnos inactivos
const cargarAlumnosInactivos = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/alumnos/inactivos`);
        const alumnosInactivos = await response.json();

        const tablaBodyInactivos = document.getElementById('tabla-body-inactivos');
        tablaBodyInactivos.innerHTML = '';

        alumnosInactivos.forEach(alumno => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${alumno.ci}</td>
                <td>${alumno.nombreCompleto}</td>
                <td>
                    <button class="btn-activar" data-id="${alumno.id}">Activar</button>
                </td>
            `;
            tablaBodyInactivos.appendChild(fila);
        });

        // Volver a agregar los event listeners después de recargar la tabla
        const botonesActivar = document.querySelectorAll('.btn-activar');
        botonesActivar.forEach(boton => {
            boton.addEventListener('click', async () => {
                const id = boton.dataset.id;
                await activarAlumno(id); // ✅ Llama a la función de activación
            });
        });
    } catch (error) {
        console.error('Error al obtener los alumnos inactivos:', error);
        alert('No se pudieron cargar los alumnos inactivos.');
    }
};
*/



import API_BASE_URL from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
    await cargarAlumnosInactivos(); // Cargar la lista inicial
});

// Función para activar un alumno (PUT)
async function activarAlumno(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/alumnos/${id}/activar`, {
            method: 'PUT',
        });

        if (response.ok) {
            mostrarMensajeActivacion('Alumno activado con éxito');
            await cargarAlumnosInactivos(); // Recargar la tabla de inactivos
        } else if (response.status === 404) {
            const data = await response.json();
            mostrarMensajeActivacion(data.mensaje); // Mostrar el mensaje del servidor
        } else {
            console.error('Error al activar el alumno:', response.status);
            mostrarMensajeActivacion('Error al activar el alumno.');
        }
    } catch (error) {
        console.error('Error de red al activar el alumno:', error);
        mostrarMensajeActivacion('Error de red al intentar activar el alumno.');
    }
}

// Función para mostrar la ventana emergente de activación
function mostrarMensajeActivacion(mensaje) {
    const body = document.body;
    const fondoOscuro = document.createElement('div');
    fondoOscuro.className = 'fondo-oscuro-activar';

    const ventanaEmergente = document.createElement('div');
    ventanaEmergente.className = 'ventana-emergente-activar';
    ventanaEmergente.innerHTML = `<p>${mensaje}</p>`;

    body.appendChild(fondoOscuro);
    body.appendChild(ventanaEmergente);

    // Desaparecer después de 5 segundos
    setTimeout(() => {
        ventanaEmergente.remove();
        fondoOscuro.remove();
    }, 5000);
}

// Función para recargar la lista de alumnos inactivos
async function cargarAlumnosInactivos() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/alumnos/inactivos`);
        const alumnosInactivos = await response.json();

        const tablaBodyInactivos = document.getElementById('tabla-body-inactivos');
        tablaBodyInactivos.innerHTML = '';

        alumnosInactivos.forEach(alumno => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${alumno.ci}</td>
                <td>${alumno.nombreCompleto}</td>
                <td>
                    <button class="btn-activar" data-id="${alumno.id}">Activar</button>
                </td>
            `;
            tablaBodyInactivos.appendChild(fila);
        });

        // Volver a agregar los event listeners después de recargar la tabla
        const botonesActivar = document.querySelectorAll('.btn-activar');
        botonesActivar.forEach(boton => {
            boton.addEventListener('click', async () => {
                const id = boton.dataset.id;
                await activarAlumno(id);
            });
        });
    } catch (error) {
        console.error('Error al obtener los alumnos inactivos:', error);
        alert('No se pudieron cargar los alumnos inactivos.');
    }
}