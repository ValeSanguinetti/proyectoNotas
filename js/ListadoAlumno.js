document.addEventListener('DOMContentLoaded', async () => {
    const cargarAlumnos = async () => {
        try {
            const response = await fetch('https://proyectonotas-production-ac16.up.railway.app//api/alumnos');
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
            boton.addEventListener('click', async () => {
                const id = boton.dataset.id;
                if (confirm(`¿Estás seguro de que quieres eliminar al alumno?`)) {
                    await eliminarAlumno(id);
                }
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
                    const response = await fetch('https://proyectonotas-production-ac16.up.railway.app//api/rellenar-pdf', {
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

    const eliminarAlumno = async (id) => {
        try {
            const response = await fetch(`https://proyectonotas-production-ac16.up.railway.app//api/alumnos/${id}`, {
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

    cargarAlumnos();
});
