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
        const response = await fetch(`http://localhost:4000/api/alumnos/${alumnoId}`);
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
            const response = await fetch(`http://localhost:4000/api/alumnos/editar/${alumnoId}`, {
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