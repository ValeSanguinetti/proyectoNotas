/*
import API_BASE_URL from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const gruposelect = document.getElementById('alumnos');

    // FUNCIONES PRIMERO
    const cargarAlumnosPorGrupos = async (grupo) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/alumnos/Listar-por-grupo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ grupo }) 
            });
    
            const Alumnos = await response.json();
            renderizarTabla(Alumnos);
        } catch (error) {
            console.error('Error al obtener los alumnos por grupo:', error);
            alert('No se pudieron cargar los alumnos.');
        }
    };

    const cargarAlumnos = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/alumnos`);
            const alumnos = await response.json();
            renderizarTabla(alumnos);
        } catch (error) {
            console.error('Error al obtener los alumnos:', error);
            alert('No se pudieron cargar los alumnos.');
        }
    };

    const renderizarTabla = (alumnos) => {
        const tablaBody = document.getElementById('tabla-body');
        tablaBody.innerHTML = '';

        alumnos.forEach(alumno => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${alumno.ci}</td>
                <td>${alumno.nombreCompleto}</td>
                <td>${alumno.cel}</td>
                <td>${alumno.grupo}</td>
                <td>
                    <button class="btn-editar" data-id="${alumno.id}">Editar</button>
                    <button class="btn-eliminar" data-id="${alumno.id}">Eliminar</button>
                    <button class="btn-vercarne" data-id="${alumno.id}">Ver Carne</button>
                </td>
            `;

            tablaBody.appendChild(fila);
        });
        
        // Botones eliminar
        const botonesEliminar = document.querySelectorAll('.btn-eliminar');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', () => {
                const id = boton.dataset.id;
                mostrarVentanaEliminar(id);
            });
        });
        // Botones editar
        const botonesEditar = document.querySelectorAll('.btn-editar');
        botonesEditar.forEach(boton => {
            boton.addEventListener('click', () => {
                const alumnoId = boton.dataset.id;
                window.location.href = `editar_alumno.html?id=${alumnoId}`;
            });
        });

        // Botones ver carné
        const botonesVerCarne = document.querySelectorAll('.btn-vercarne');
        botonesVerCarne.forEach(boton => {
            boton.addEventListener('click', async () => {
                const alumnoId = boton.dataset.id;

                try {
                    const response = await fetch(`${API_BASE_URL}/api/rellenar-pdf`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ alumnoId })
                    });

                    const data = await response.json();
                    if (response.ok) {
                        // Redirige a la pantalla de ver-pdf.html con la URL del PDF como parámetro
                        window.location.href = `ver_pdf.html?pdfUrl=${encodeURIComponent(data.urlPdf)}`;
                    } else {
                        alert(data.mensaje || 'Error al generar el carné.');
                    }

                } catch (error) {
                    console.error('Error al generar el carné:', error);
                    alert('Error al generar el carné.');
                }
            });
        });
    };

    const mostrarVentanaEliminar = (id) => {
        const body = document.body;
        const fondoOscuro = document.createElement('div');
        fondoOscuro.className = 'fondo-oscuro-eliminar';

        const ventanaEmergente = document.createElement('div');
        ventanaEmergente.className = 'ventana-emergente-eliminar';
        ventanaEmergente.innerHTML = `
            <p>¿Estás seguro de que quieres eliminar a este alumno?</p>
            <button class="btn-confirmar-eliminar">Eliminar</button>
            <button class="btn-cancelar-eliminar">Cancelar</button>
        `;

        body.appendChild(fondoOscuro);
        body.appendChild(ventanaEmergente);

        const botonConfirmar = ventanaEmergente.querySelector('.btn-confirmar-eliminar');
        const botonCancelar = ventanaEmergente.querySelector('.btn-cancelar-eliminar');

        botonConfirmar.addEventListener('click', async () => {
            await eliminarAlumno(id);
            ventanaEmergente.remove();
            fondoOscuro.remove();
        });

        botonCancelar.addEventListener('click', () => {
            ventanaEmergente.remove();
            fondoOscuro.remove();
        });
    };

    const eliminarAlumno = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/alumnos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                cargarAlumnos();
            } else if (response.status === 404) {
                const data = await response.json();
                alert(data.mensaje);
            } else {
                console.error('Error al eliminar el alumno:', response.status);
                alert('Error al eliminar el alumno.');
            }
        } catch (error) {
            console.error('Error de red al eliminar el alumno:', error);
            alert('Error de red al intentar eliminar el alumno.');
        }
    };

    // CARGAR SELECT 
    try {
        const response = await fetch(`${API_BASE_URL}/api/gruposunicos`);
        const grupos = await response.json();

        const opcionTodos = document.createElement('option');
        opcionTodos.value = '';
        opcionTodos.textContent = '-- Ver todos --';
        gruposelect.appendChild(opcionTodos);

        grupos.forEach(alumno => {
            const option = document.createElement('option');
            option.value = alumno.grupo;
            option.textContent = alumno.grupo;
            gruposelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los nombres:', error);
    }

    // EVENTO SELECT CAMBIA
    gruposelect.addEventListener('change', async () => {
        const grupoSeleccionado = gruposelect.value;
        if (grupoSeleccionado) {
            await cargarAlumnosPorGrupos(grupoSeleccionado);
        } else {
            await cargarAlumnos(); // Mostrar todos si no se selecciona nada
        }
    });

    cargarAlumnos();
});
*/



import API_BASE_URL from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const gruposelect = document.getElementById('alumnos');

    // FUNCIONES PRIMERO
    const cargarAlumnosPorGrupos = async (grupo) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/alumnos/Listar-por-grupo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ grupo })
            });

            const Alumnos = await response.json();
            renderizarTabla(Alumnos);
        } catch (error) {
            console.error('Error al obtener los alumnos por grupo:', error);
            alert('No se pudieron cargar los alumnos.');
        }
    };

    const cargarAlumnos = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/alumnos`);
            const alumnos = await response.json();
            renderizarTabla(alumnos);
        } catch (error) {
            console.error('Error al obtener los alumnos:', error);
            alert('No se pudieron cargar los alumnos.');
        }
    };

    const renderizarTabla = (alumnos) => {
        const tablaBody = document.getElementById('tabla-body');
        tablaBody.innerHTML = '';

        alumnos.forEach(alumno => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${alumno.ci}</td>
                <td>${alumno.nombreCompleto}</td>
                <td>${alumno.cel}</td>
                <td>${alumno.grupo}</td>
                <td>
                    <button class="btn-editar" data-id="${alumno.id}">Editar</button>
                    <button class="btn-eliminar" data-id="${alumno.id}">Eliminar</button>
                    <button class="btn-vercarne" data-id="${alumno.id}">Ver Carné</button>
                    <button class="btn-eliminar-definitivo" data-id="${alumno.id}">Eliminar Definitivamente</button>
                </td>
            `;

            tablaBody.appendChild(fila);
        });

        // Botones eliminar
        const botonesEliminar = document.querySelectorAll('.btn-eliminar');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', () => {
                const id = boton.dataset.id;
                mostrarVentanaEliminar(id);
            });
        });
        // Botones editar
        const botonesEditar = document.querySelectorAll('.btn-editar');
        botonesEditar.forEach(boton => {
            boton.addEventListener('click', () => {
                const alumnoId = boton.dataset.id;
                window.location.href = `editar_alumno.html?id=${alumnoId}`;
            });
        });

        // Botones ver carné
        const botonesVerCarne = document.querySelectorAll('.btn-vercarne');
        botonesVerCarne.forEach(boton => {
            boton.addEventListener('click', async () => {
                const alumnoId = boton.dataset.id;

                try {
                    const response = await fetch(`${API_BASE_URL}/api/rellenar-pdf`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ alumnoId })
                    });

                    const data = await response.json();
                    if (response.ok) {
                        // Redirige a la pantalla de ver-pdf.html con la URL del PDF como parámetro
                        window.location.href = `ver_pdf.html?pdfUrl=${encodeURIComponent(data.urlPdf)}`;
                    } else {
                        alert(data.mensaje || 'Error al generar el carné.');
                    }

                } catch (error) {
                    console.error('Error al generar el carné:', error);
                    alert('Error al generar el carné.');
                }
            });
        });

        // NUEVO: Event listeners para los botones "Eliminar Definitivamente"
        const botonesEliminarDefinitivo = document.querySelectorAll('.btn-eliminar-definitivo');
        botonesEliminarDefinitivo.forEach(boton => {
            boton.addEventListener('click', () => {
                const id = boton.dataset.id;
                // ¡Aquí debes agregar la lógica para la eliminación definitiva!
                console.log(`¡Eliminar Definitivamente el alumno con ID: ${id}!`);
                mostrarVentanaEliminarDefinitivo(id); // Llamada a la nueva función
            });
        });
    };

    const mostrarVentanaEliminar = (id) => {
        const body = document.body;
        const fondoOscuro = document.createElement('div');
        fondoOscuro.className = 'fondo-oscuro-eliminar';

        const ventanaEmergente = document.createElement('div');
        ventanaEmergente.className = 'ventana-emergente-eliminar';
        ventanaEmergente.innerHTML = `
            <p>¿Estás seguro de que quieres eliminar a este alumno?</p>
            <button class="btn-confirmar-eliminar">Eliminar</button>
            <button class="btn-cancelar-eliminar">Cancelar</button>
        `;

        body.appendChild(fondoOscuro);
        body.appendChild(ventanaEmergente);

        const botonConfirmar = ventanaEmergente.querySelector('.btn-confirmar-eliminar');
        const botonCancelar = ventanaEmergente.querySelector('.btn-cancelar-eliminar');

        botonConfirmar.addEventListener('click', async () => {
            await eliminarAlumno(id);
            ventanaEmergente.remove();
            fondoOscuro.remove();
        });

        botonCancelar.addEventListener('click', () => {
            ventanaEmergente.remove();
            fondoOscuro.remove();
        });
    };

    const eliminarAlumno = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/alumnos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                cargarAlumnos();
            } else if (response.status === 404) {
                const data = await response.json();
                alert(data.mensaje);
            } else {
                console.error('Error al eliminar el alumno:', response.status);
                alert('Error al eliminar el alumno.');
            }
        } catch (error) {
            console.error('Error de red al eliminar el alumno:', error);
            alert('Error de red al intentar eliminar el alumno.');
        }
    };

    // NUEVO: Función para mostrar la ventana de confirmación de eliminación definitiva
    const mostrarVentanaEliminarDefinitivo = (id) => {
        const body = document.body;
        const fondoOscuro = document.createElement('div');
        fondoOscuro.className = 'fondo-oscuro-eliminar'; // Reutilizamos el fondo oscuro

        const ventanaEmergente = document.createElement('div');
        ventanaEmergente.className = 'ventana-emergente-eliminar'; // Reutilizamos la ventana emergente
        ventanaEmergente.innerHTML = `
            <p>¡PELIGRO! ¿Estás SEGURO de que quieres ELIMINAR DEFINITIVAMENTE a este alumno?</p>
            <p>Esta acción es IRREVERSIBLE y borrará todos sus datos.</p>
            <button class="btn-confirmar-eliminar-definitivo">Eliminar Definitivamente</button>
            <button class="btn-cancelar-eliminar">Cancelar</button>
        `;

        body.appendChild(fondoOscuro);
        body.appendChild(ventanaEmergente);

        const botonConfirmarDefinitivo = ventanaEmergente.querySelector('.btn-confirmar-eliminar-definitivo');
        const botonCancelar = ventanaEmergente.querySelector('.btn-cancelar-eliminar');

        botonConfirmarDefinitivo.addEventListener('click', async () => {
            await eliminarAlumnoDefinitivo(id); // Llama a la función de eliminación definitiva
            ventanaEmergente.remove();
            fondoOscuro.remove();
        });

        botonCancelar.addEventListener('click', () => {
            ventanaEmergente.remove();
            fondoOscuro.remove();
        });
    };
    
    const eliminarAlumnoDefinitivo = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/alumnos/eliminar-definitivo/${id}`, { // Ajusta la ruta de tu API
            method: 'DELETE',
        });

        if (response.ok) {
            mostrarMensajeEliminacionDefinitiva('¡Alumno eliminado DEFINITIVAMENTE!');
            cargarAlumnos();
        } else if (response.status === 404) {
            const data = await response.json();
            mostrarMensajeEliminacionDefinitiva(data.mensaje);
        } else {
            console.error('Error al eliminar definitivamente el alumno:', response.status);
            mostrarMensajeEliminacionDefinitiva('Error al eliminar definitivamente el alumno.');
        }
    } catch (error) {
        console.error('Error de red al eliminar definitivamente el alumno:', error);
        mostrarMensajeEliminacionDefinitiva('Error de red al intentar eliminar definitivamente el alumno.');
    }
};

// NUEVA FUNCIÓN PARA MOSTRAR EL MENSAJE DE ELIMINACIÓN DEFINITIVA
function mostrarMensajeEliminacionDefinitiva(mensaje) {
    const body = document.body;
    const fondoOscuro = document.createElement('div');
    fondoOscuro.className = 'fondo-oscuro-activar'; // Reutilizamos la clase de estilo

    const ventanaEmergente = document.createElement('div');
    ventanaEmergente.className = 'ventana-emergente-activar'; // Reutilizamos la clase de estilo
    ventanaEmergente.innerHTML = `<p>${mensaje}</p>`;

    body.appendChild(fondoOscuro);
    body.appendChild(ventanaEmergente);

    // Desaparecer después de 4 segundos (como el mensaje de activación)
    setTimeout(() => {
        ventanaEmergente.remove();
        fondoOscuro.remove();
    }, 4000);
}

    // CARGAR SELECT
    try {
        const response = await fetch(`${API_BASE_URL}/api/gruposunicos`);
        const grupos = await response.json();

        const opcionTodos = document.createElement('option');
        opcionTodos.value = '';
        opcionTodos.textContent = '-- Ver todos --';
        gruposelect.appendChild(opcionTodos);

        grupos.forEach(alumno => {
            const option = document.createElement('option');
            option.value = alumno.grupo;
            option.textContent = alumno.grupo;
            gruposelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los nombres:', error);
    }

    // EVENTO SELECT CAMBIA
    gruposelect.addEventListener('change', async () => {
        const grupoSeleccionado = gruposelect.value;
        if (grupoSeleccionado) {
            await cargarAlumnosPorGrupos(grupoSeleccionado);
        } else {
            await cargarAlumnos(); // Mostrar todos si no se selecciona nada
        }
    });

    cargarAlumnos();
});