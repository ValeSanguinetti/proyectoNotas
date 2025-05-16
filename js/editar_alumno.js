

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
    const contenedorMensajes = document.querySelector('.registrar-alumno-register-form');

    function mostrarMensaje(tipo, mensaje) {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `mensaje-${tipo}`;
        mensajeDiv.textContent = mensaje;
        mensajeDiv.style.position = 'absolute';
        mensajeDiv.style.top = '10px';
        mensajeDiv.style.left = '10px';
        mensajeDiv.style.right = '10px';
        contenedorMensajes.insertBefore(mensajeDiv, contenedorMensajes.firstChild);

        setTimeout(() => {
            mensajeDiv.remove();
        }, 4000);
    }

    if (!botonEditar) {
        console.error('No se encontró el botón de edición (.form-edit)');
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const alumnoId = params.get('id');

    if (!alumnoId) {
        mostrarMensaje('alerta', 'ID de alumno no especificado en la URL');
        return;
    }

    const ciInput = document.getElementById('ci');
    const celInput = document.getElementById('cel');
    const grupoInput= document.getElementById('grupo');
    function formatCI(value) {
        const cleanedValue = value.replace(/\D/g, '').slice(0, 8);
        let formattedValue = '';

        if (cleanedValue.length > 0) {
            formattedValue += cleanedValue.substring(0, 1);
        }
        if (cleanedValue.length > 1) {
            formattedValue += '.' + cleanedValue.substring(1, Math.min(4, cleanedValue.length));
        }
        if (cleanedValue.length > 4) {
            formattedValue += '.' + cleanedValue.substring(4, Math.min(7, cleanedValue.length));
        }
        if (cleanedValue.length > 7) {
            formattedValue += '-' + cleanedValue.substring(7, 8);
        }
        return formattedValue;
    }

    function formatCel(value) {
        const cleanedValue = value.replace(/\D/g, '').slice(0, 9);
        let formattedValue = '';

        for (let i = 0; i < cleanedValue.length; i++) {
            if (i > 0 && i % 3 === 0) {
                formattedValue += ' ';
            }
            formattedValue += cleanedValue[i];
        }
        return formattedValue;
    }

    ciInput.addEventListener('input', function () {
        this.value = formatCI(this.value);
    });

    celInput.addEventListener('input', function () {
        this.value = formatCel(this.value);
    });

    try {
        const response = await fetch(`${API_BASE_URL}/api/alumnos/${alumnoId}`);
        const alumno = await response.json();

        if (response.ok) {
            document.getElementById('ci').value = formatCI(alumno.ci) || '';
            document.getElementById('nombreCompleto').value = alumno.nombreCompleto || '';
            document.getElementById('cel').value = formatCel(alumno.cel) || '';
            document.getElementById('grupo').value = alumno.grupo || '';

        } else {
            mostrarMensaje('error', 'No se pudieron cargar los datos del alumno.');
        }
    } catch (error) {
        console.error('Error al obtener el alumno:', error);
        mostrarMensaje('error', 'Error al conectar con el servidor al obtener el alumno.');
    }

    botonEditar.addEventListener('click', async function () {
        const ci = ciInput.value.trim();
        const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
        const cel = celInput.value.trim();
        const grupo= grupoInput.value.trim();
        if (!ci || !nombreCompleto || !cel || !grupo) {
            mostrarMensaje('error', 'Por favor completa todos los campos.');
            return;
        }

        if (ci.replace(/\D/g, '').length < 8 && cel.replace(/\D/g, '').length < 9) {
            mostrarMensaje('error', 'Campos incompletos');
            return;
        }

        if (ci.replace(/\D/g, '').length < 8) {
            mostrarMensaje('error', 'C.I. Incompleta');
            return;
        }

        if (cel.replace(/\D/g, '').length < 9) {
            mostrarMensaje('error', 'Número de celular incompleto');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/alumnos/editar/${alumnoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ci, nombreCompleto, cel, grupo })
            });

            if (response.ok) {
                mostrarMensaje('exito', 'Alumno actualizado correctamente.');
                setTimeout(() => {
                    window.location.href = 'Listado_De_Alumnos.html';
                }, 1500);
            } else {
                const errorData = await response.json();
                mostrarMensaje('error', 'Error al actualizar el alumno: ' + (errorData.mensaje || 'Error desconocido'));
            }
        } catch (error) {
            console.error('Error al actualizar:', error);
            mostrarMensaje('error', 'Error de red al actualizar al alumno.');
        }
    });
});
