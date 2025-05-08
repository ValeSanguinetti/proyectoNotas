import API_BASE_URL from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const escritoselect = document.getElementById('escritos');

    // FUNCIONES PRIMERO
    const cargarEscritosPorNombre = async (nombre) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/escritos/listar-por-nombre`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre }) 
            });
    
            const escritos = await response.json();
            renderizarTabla(escritos);
        } catch (error) {
            console.error('Error al obtener los escritos por nombre:', error);
            alert('No se pudieron cargar los escritos.');
        }
    };

    const cargarEscritos = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/escritos`);
            const escritos = await response.json();
            renderizarTabla(escritos);
        } catch (error) {
            console.error('Error al obtener los escritos:', error);
            alert('No se pudieron cargar los escritos.');
        }
    };

    const renderizarTabla = (escritos) => {
        const tablaBody = document.getElementById('tabla-escritos-body');
        tablaBody.innerHTML = '';

        escritos.forEach(escrito => {
            const fila = document.createElement('tr');
            const fechaFormateada = new Date(escrito.fecha).toLocaleDateString();

            fila.innerHTML = `
                <td>${escrito.nombre}</td>
                <td>${fechaFormateada}</td>
                <td>${escrito.nota}</td>
                <td>${escrito.nombreCompleto || 'Desconocido'}</td>
                <td>${escrito.publicado ? 'Sí' : 'No'}</td>
                <td>
                    <button class="btn-editar" data-id="${escrito.id}">Editar</button>
                    <button class="btn-eliminar" data-id="${escrito.id}">Eliminar</button>
                </td>
            `;
            tablaBody.appendChild(fila);
        });

        agregarEventos();
    };

    const agregarEventos = () => {
        document.querySelectorAll('.btn-eliminar').forEach(boton => {
            boton.addEventListener('click', async () => {
                const id = boton.dataset.id;
                if (confirm('¿Estás seguro de que quieres eliminar este escrito?')) {
                    await eliminarEscrito(id);
                }
            });
        });

        document.querySelectorAll('.btn-editar').forEach(boton => {
            boton.addEventListener('click', () => {
                const id = boton.dataset.id;
                window.location.href = `editar_escrito.html?id=${id}`;
            });
        });
    };

    const eliminarEscrito = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/escritos/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Escrito eliminado correctamente.');

                const nombreSeleccionado = escritoselect.value;
                if (nombreSeleccionado) {
                    await cargarEscritosPorNombre(nombreSeleccionado);
                } else {
                    await cargarEscritos();
                }
            } else {
                const data = await response.json();
                alert(data.mensaje || 'No se pudo eliminar el escrito.');
            }
        } catch (error) {
            console.error('Error al eliminar el escrito:', error);
            alert('Error de red al intentar eliminar el escrito.');
        }
    };

    // CARGAR SELECT DE NOMBRES
    try {
        const response = await fetch(`${API_BASE_URL}/api/escritosnombres`);
        const escritos = await response.json();

        const opcionTodos = document.createElement('option');
        opcionTodos.value = '';
        opcionTodos.textContent = '-- Ver todos --';
        escritoselect.appendChild(opcionTodos);

        escritos.forEach(escrito => {
            const option = document.createElement('option');
            option.value = escrito.nombre;
            option.textContent = escrito.nombre;
            escritoselect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los nombres:', error);
    }

    // EVENTO SELECT CAMBIA
    escritoselect.addEventListener('change', async () => {
        const nombreSeleccionado = escritoselect.value;
        if (nombreSeleccionado) {
            await cargarEscritosPorNombre(nombreSeleccionado);
        } else {
            await cargarEscritos(); // Mostrar todos si no se selecciona nada
        }
    });

    // MOSTRAR TODOS AL INICIO
    await cargarEscritos();
});
