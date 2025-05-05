document.addEventListener('DOMContentLoaded', async () => {
    const cargarEscritos = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/escritos');
            const escritos = await response.json();
            renderizarTabla(escritos);
            console.log(escritos);
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
        // Botones eliminar
        document.querySelectorAll('.btn-eliminar').forEach(boton => {
            boton.addEventListener('click', async () => {
                const id = boton.dataset.id;
                if (confirm('¿Estás seguro de que quieres eliminar este escrito?')) {
                    await eliminarEscrito(id);
                }
            });
        });

        // Botones editar
        document.querySelectorAll('.btn-editar').forEach(boton => {
            boton.addEventListener('click', () => {
                const id = boton.dataset.id;
                window.location.href = `editar_escrito.html?id=${id}`;
            });
        });


    };

    const eliminarEscrito = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/escritos/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Escrito eliminado correctamente.');
                cargarEscritos();
            } else {
                const data = await response.json();
                alert(data.mensaje || 'No se pudo eliminar el escrito.');
            }
        } catch (error) {
            console.error('Error al eliminar el escrito:', error);
            alert('Error de red al intentar eliminar el escrito.');
        }
    };

    cargarEscritos();
});
