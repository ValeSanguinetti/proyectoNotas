import API_BASE_URL from './config.js';

document.addEventListener('DOMContentLoaded', async function () {
    const alumnoSelect = document.getElementById('alumnoId');

    try {
        const response = await fetch(`${API_BASE_URL}/api/alumnos`);
        const alumnos = await response.json();

        alumnos.forEach(alumno => {
            const option = document.createElement('option');
            option.value = alumno.id; 
            option.textContent = alumno.nombreCompleto; 
            alumnoSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los alumnos:', error);
        alert('No se pudieron cargar los alumnos.');
    }
});


    document.querySelector('.guardar-button').addEventListener('click', async () => {
        const nombre = document.getElementById('nombre_escrito').value.trim();
        const alumnoId = document.getElementById('alumnoId').value;
        const fecha = document.getElementById('fecha_escrito').value;
        const nota = document.getElementById('nota_escrito').value.trim();
        console.log(fecha);
        if (!nombre || !alumnoId || !fecha || !nota) {
            alert('Por favor completa todos los campos.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/escritos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    alumnoId,
                    fecha,
                    nota
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Escrito registrado correctamente.');
                document.querySelectorAll('input, select').forEach(input => input.value = '');
            } else {
                alert('Error al registrar el escrito: ' + (data.mensaje || 'Error desconocido.'));
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            alert('No se pudo registrar el escrito.');
        }
    });

