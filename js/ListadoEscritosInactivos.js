document.addEventListener('DOMContentLoaded', async () => {
    // Carga los escritos inactivos al cargar la página
    await cargarEscritosInactivos();

    // Función principal para cargar los escritos inactivos
    async function cargarEscritosInactivos() {
        try {
            const response = await fetch('http://localhost:4000/api/escritos/inactivos');
            const escritos = await response.json();
            renderizarTabla(escritos);
        } catch (error) {
            console.error('Error al obtener los escritos:', error);
            alert('No se pudieron cargar los escritos.');
        }
    }

    // Renderiza los datos en la tabla HTML
    function renderizarTabla(escritos) {
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
                    <button class="btn-activar" data-id="${escrito.id}">Activar</button>
                </td>
            `;

            tablaBody.appendChild(fila);
        });

        agregarEventosActivar();
    }

    // Agrega los eventos a los botones de "Activar"
    function agregarEventosActivar() {
        const botonesActivar = document.querySelectorAll('.btn-activar');
        botonesActivar.forEach(boton => {
            boton.addEventListener('click', async () => {
                const id = boton.dataset.id;
                await activarEscrito(id);
            });
        });
    }

    // Realiza la petición PUT para activar un escrito
    async function activarEscrito(id) {
        try {
            const response = await fetch(`http://localhost:4000/api/escritos/activar/${id}`, {
                method: 'PUT',
            });

            if (response.ok) {
                alert('Escrito activado correctamente.');
                await cargarEscritosInactivos(); // Recarga la tabla
            } else if (response.status === 404) {
                const data = await response.json();
                alert(data.mensaje);
            } else {
                console.error('Error al activar el escrito:', response.status);
                alert('Error al activar el escrito.');
            }
        } catch (error) {
            console.error('Error de red al activar el escrito:', error);
            alert('Error de red al intentar activar el escrito.');
        }
    }
});
