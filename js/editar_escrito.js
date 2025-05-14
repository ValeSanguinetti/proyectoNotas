
import API_BASE_URL from './config.js';
 // Menú hamburguesa
 document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.getElementById("nav-list");
    const closeMenu = document.getElementById("close-menu");

    menuToggle.addEventListener("click", () => {
        navList.style.display = navList.style.display === "block" ? "none" : "block";
    });

    closeMenu.addEventListener("click", () => {
        navList.style.display = "none";
    });
});

document.addEventListener('DOMContentLoaded', async function () {
    const botonEditar = document.querySelector('.form-edit');
    const contenedorMensajes = document.querySelector('.escritos-form-container'); // El contenedor donde mostrar mensajes

    function mostrarMensaje(tipo, mensaje) {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `mensaje-${tipo}`; // 'mensaje-error' o 'mensaje-alerta'
        mensajeDiv.textContent = mensaje;
        mensajeDiv.style.marginTop = '10px'; // Espacio superior
        contenedorMensajes.insertBefore(mensajeDiv, botonEditar); // Insertar antes del botón

        setTimeout(() => {
            mensajeDiv.remove();
        }, 3000);
    }

    if (!botonEditar) {
        console.error('No se encontró el botón de edición (.form-edit)');
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const escritoId = params.get('id');

    if (!escritoId) {
        mostrarMensaje('alerta', 'ID de escrito no especificado en la URL');
        return;
    }

    // Cargar datos del escrito
    try {
        const response = await fetch(`${API_BASE_URL}/api/escritos/${escritoId}`);
        const escrito = await response.json();

        if (response.ok) {
            document.getElementById('nombre_escrito').value = escrito.nombre || '';
            document.getElementById('alumnoId').textContent = escrito.nombreCompleto;

            const fecha = new Date(escrito.fecha);
            const fechaFormateada = fecha.toISOString().split('T')[0];
            document.getElementById('fecha_escrito').value = fechaFormateada;

            document.getElementById('nota_escrito').value = escrito.nota;
        } else {
            mostrarMensaje('error', 'No se pudo cargar los datos del escrito.');
        }
    } catch (error) {
        console.error('Error al obtener el escrito:', error);
        mostrarMensaje('error', 'Error al conectar con el servidor al obtener el escrito.');
    }

    // Evento de edición del escrito
    botonEditar.addEventListener('click', async function () {
        const nombre = document.getElementById('nombre_escrito').value.trim();
        const fecha = document.getElementById('fecha_escrito').value;
        const nota = document.getElementById('nota_escrito').value;

        if (!nombre || !fecha || !nota) {
            mostrarMensaje('error', 'Por favor completa todos los campos del escrito.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/escritos/editar/${escritoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, fecha, nota })
            });

            if (response.ok) {
                mostrarMensaje('exito', 'Escrito actualizado correctamente.');
                setTimeout(() => {
                    window.location.href = './Listado_Escritos.html';
                }, 1500);
            } else {
                const errorData = await response.json();
                mostrarMensaje('error', 'Error al actualizar el escrito: ' + (errorData.mensaje || 'Error desconocido'));
            }
        } catch (error) {
            console.error('Error al actualizar el escrito:', error);
            mostrarMensaje('error', 'Error de red al actualizar el escrito.');
        }
    });
});