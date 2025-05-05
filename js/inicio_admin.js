import API_BASE_URL from './config.js';
document.addEventListener('DOMContentLoaded', function () {
    const select = document.getElementById('nombreescrito');

    // Cargar los nombres de escritos
    fetch(`${API_BASE_URL}/api/escritosnombres`)
        .then(response => response.json())
        .then(data => {
            data.forEach(escrito => {
                const option = document.createElement('option');
                option.value = escrito.nombre;
                option.textContent = escrito.nombre;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar los nombres:', error));

    // Enviar a la ruta de publicación cuando se selecciona un nombre
    select.addEventListener('change', function () {
        const nombreSeleccionado = this.value;
        if (nombreSeleccionado) {
            fetch(`${API_BASE_URL}/api/escritos/publicar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre: nombreSeleccionado })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje); // Mostrar mensaje de éxito
            })
            .catch(error => {
                console.error('Error al publicar los escritos:', error);
                alert('Error al publicar los escritos');
            });
        }
    });
});

document.querySelectorAll('.nota-mes').forEach(boton => {
    boton.addEventListener('click', async () => {
        const mes = boton.dataset.mes;
        try {
            const response = await fetch(`${API_BASE_URL}/api/notascarne/publicar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mes })
            });

            const data = await response.json();
            if (response.ok) {
                alert(`✅ ${data.mensaje}`);
            } else {
                alert(`❌ Error: ${data.mensaje}`);
            }
        } catch (error) {
            alert('❌ Error al conectar con el servidor');
            console.error(error);
        }
    });
});