
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
    const alumnoSelect = document.getElementById('alumnoId');
    const contenedorMensajes = document.querySelector('.escritos-form-container');
    const botonGuardar = document.querySelector('.guardar-button');

    function mostrarMensaje(tipo, mensaje) {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `mensaje-${tipo}`;
        mensajeDiv.textContent = mensaje;
        contenedorMensajes.insertBefore(mensajeDiv, botonGuardar);

        setTimeout(() => {
            mensajeDiv.remove();
        }, 3000);
    }

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
        mostrarMensaje('error', 'No se pudieron cargar los alumnos.');
    }

    document.querySelector('.guardar-button').addEventListener('click', async () => {
        const nombre = document.getElementById('nombre_escrito').value.trim();
        const alumnoId = document.getElementById('alumnoId').value;
        const fecha = document.getElementById('fecha_escrito').value;
        const nota = document.getElementById('nota_escrito').value.trim();
        console.log(fecha);
        if (!nombre || !alumnoId || !fecha || !nota) {
            mostrarMensaje('alerta', 'Por favor completa todos los campos.');
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
                mostrarMensaje('exito', 'Escrito registrado correctamente.');
                setTimeout(() => {
                    window.location.href = '../Pantallas/Listado_Escritos.html';
                }, 1500);
            } else {
                mostrarMensaje('error', 'Error al registrar el escrito: ' + (data.mensaje || 'Error desconocido.'));
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            mostrarMensaje('error', 'No se pudo registrar el escrito.');
        }
    });
});