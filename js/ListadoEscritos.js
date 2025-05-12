
import API_BASE_URL from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const escritoselect = document.getElementById('escritos');
    const body = document.body;

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
                    <button class="btn-eliminar-definitivo" data-id="${escrito.id}">Eliminar definitivamente</button>
                </td>
            `;
            tablaBody.appendChild(fila);
        });

        agregarEventos();
    };

    const agregarEventos = () => {
        document.querySelectorAll('.btn-eliminar').forEach(boton => {
            boton.addEventListener('click', () => {
                const id = boton.dataset.id;
                mostrarVentanaEliminar(id);
            });
        });

        document.querySelectorAll('.btn-editar').forEach(boton => {
            boton.addEventListener('click', () => {
                const id = boton.dataset.id;
                window.location.href = `editar_escrito.html?id=${id}`;
            });
        });
        document.querySelectorAll('.btn-eliminar-definitivo').forEach(boton => {
            boton.addEventListener('click', () => {
                const id = boton.dataset.id;
                mostrarVentanaEliminarDefinitivo(id);
            });
        });
    };

    const mostrarVentanaEliminar = (id) => {
        const fondoOscuro = document.createElement('div');
        fondoOscuro.className = 'fondo-oscuro-eliminar';

        const ventanaEmergente = document.createElement('div');
        ventanaEmergente.className = 'ventana-emergente-eliminar';
        ventanaEmergente.innerHTML = `
            <p>¿Estás seguro de que quieres eliminar este escrito?</p>
            <button class="btn-confirmar-eliminar">Eliminar</button>
            <button class="btn-cancelar-eliminar">Cancelar</button>
        `;

        body.appendChild(fondoOscuro);
        body.appendChild(ventanaEmergente);

        const botonConfirmar = ventanaEmergente.querySelector('.btn-confirmar-eliminar');
        const botonCancelar = ventanaEmergente.querySelector('.btn-cancelar-eliminar');

        botonConfirmar.addEventListener('click', async () => {
            await eliminarEscrito(id);
            ventanaEmergente.remove();
            fondoOscuro.remove();
            mostrarMensajeEliminado(); 
        });

        botonCancelar.addEventListener('click', () => {
            ventanaEmergente.remove();
            fondoOscuro.remove();
        });
    };
    const mostrarVentanaEliminarDefinitivo = (id) => {
        const body = document.body;
        const fondoOscuro = document.createElement('div');
        fondoOscuro.className = 'fondo-oscuro-eliminar'; // Reutilizamos el fondo oscuro

        const ventanaEmergente = document.createElement('div');
        ventanaEmergente.className = 'ventana-emergente-eliminar'; // Reutilizamos la ventana emergente
        ventanaEmergente.innerHTML = `
            <p>¡PELIGRO! ¿Estás SEGURO de que quieres ELIMINAR DEFINITIVAMENTE a este escrito?</p>
            <p>Esta acción es IRREVERSIBLE y borrará todos sus datos.</p>
            <button class="btn-confirmar-eliminar-definitivo">Eliminar Definitivamente</button>
            <button class="btn-cancelar-eliminar">Cancelar</button>
        `;

        body.appendChild(fondoOscuro);
        body.appendChild(ventanaEmergente);

        const botonConfirmarDefinitivo = ventanaEmergente.querySelector('.btn-confirmar-eliminar-definitivo');
        const botonCancelar = ventanaEmergente.querySelector('.btn-cancelar-eliminar');

        botonConfirmarDefinitivo.addEventListener('click', async () => {
            await eliminarEscritoDefinitivo(id); // Llama a la función de eliminación definitiva
            ventanaEmergente.remove();
            fondoOscuro.remove();
        });

        botonCancelar.addEventListener('click', () => {
            ventanaEmergente.remove();
            fondoOscuro.remove();
        });
    };

    const eliminarEscritoDefinitivo = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/eliminar-definitivo/${id}`, { // Ajusta la ruta de tu API
                method: 'DELETE',
            });
            if (response.ok) {
                const nombreSeleccionado = escritoselect.value;
                if (nombreSeleccionado) {
                    await cargarEscritosPorNombre(nombreSeleccionado);
                } else {
                    await cargarEscritos();
                }
                mostrarMensajeEliminado();
            } else {
                const data = await response.json();
                alert(data.mensaje || 'No se pudo eliminar el escrito.');
            }
        } catch (error) {
            console.error('Error de red al eliminar definitivamente el escrito:', error);
            alert('Error de red al intentar eliminar definitivamente el escrito.');
        }
    };
    const mostrarMensajeEliminado = () => {
        const fondoOscuro = document.createElement('div');
        fondoOscuro.className = 'fondo-oscuro-activar'; 
    
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = 'ventana-emergente-activar'; 
        mensajeDiv.textContent = 'Escrito eliminado correctamente';
    
        body.appendChild(fondoOscuro); 
        body.appendChild(mensajeDiv);
    
        setTimeout(() => {
            mensajeDiv.remove();
            fondoOscuro.remove(); 
        }, 3000);
    };

    const eliminarEscrito = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/escritos/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
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
            await cargarEscritos(); 
        }
    });

    // MOSTRAR TODOS AL INICIO
    await cargarEscritos();
});