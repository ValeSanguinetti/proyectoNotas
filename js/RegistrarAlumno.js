import API_BASE_URL from './config.js';

document.addEventListener('DOMContentLoaded', function () {
    const botonRegistrar = document.querySelector('.register-submit-button');

    botonRegistrar.addEventListener('click', async function () {
        const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
        const ci = document.getElementById('ci').value.trim();

        if (!nombreCompleto || !ci) {
            alert('Por favor completa todos los campos.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/alumnos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombreCompleto: nombreCompleto,
                    ci: ci
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Alumno registrado exitosamente.');
                document.getElementById('nombreCompleto').value = '';
                document.getElementById('ci').value = '';
            } else {
                alert('Error al registrar el alumno: ' + data.error);
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('Error al conectar con el servidor.');
        }
    });
});
