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
function agregarContador(idTextarea, idContador, maxChars) {
    const textarea = document.getElementById(idTextarea);
    const contador = document.getElementById(idContador);
    if (textarea && contador) {
        textarea.addEventListener('input', function () {
            const restante = maxChars - textarea.value.length;
            contador.textContent = `${restante}`;
        });
    }
}
document.addEventListener('DOMContentLoaded', async function () {
       
       
        // Contador de caracteres
      agregarContador('comprension_lectura', 'contadorComprensionLectura', 100);
agregarContador('produccion_texto', 'contadorProduccionTexto', 150);
agregarContador('produccion_oral', 'contadorProduccionOral', 110);
agregarContador('comprension_auditiva', 'contadorComprensionAuditiva', 110);
agregarContador('tareas', 'contadorTareas', 67);
agregarContador('escritos', 'contadorEscritos', 80);
agregarContador('conceptos', 'contadorConceptos', 140);
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
        mostrarMensajeError('No se pudieron cargar los alumnos.', document.querySelector('.button-registrar'));
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const botonRegistrarNota = document.querySelector('.button-registrar');
    const formulario = document.querySelector('.registrar-alumno-register-form');
    const contenedorMensajes = document.createElement('div'); // Crear un contenedor para los mensajes
    contenedorMensajes.className = 'contenedor-mensajes';  // Asignar una clase para estilos

    // Insertar el contenedor después del formulario
    formulario.parentNode.insertBefore(contenedorMensajes, formulario.nextSibling);

    botonRegistrarNota.addEventListener('click', async function (event) {
        event.preventDefault();

        const alumnoId = document.getElementById('alumnoId');
        const grado = document.getElementById('grado');
        const mesSelect = document.getElementById('mes');
        const comprension_lectura = document.getElementById('comprension_lectura');
        const produccion_texto = document.getElementById('produccion_texto');
        const produccion_oral = document.getElementById('produccion_oral');
        const comprension_auditiva = document.getElementById('comprension_auditiva');
        const tareas = document.getElementById('tareas');
        const escritos = document.getElementById('escritos');
        const campos = [alumnoId, grado, mesSelect, comprension_lectura, produccion_texto, produccion_oral, comprension_auditiva, tareas, escritos];

        let mes = '';
        if (mesSelect.value == 1) {
            mes = 'Marzo, Abril, Mayo';
        } else if (mesSelect.value == 2) {
            mes = 'Junio, Julio, Agosto';
        } else if (mesSelect.value == 3) {
            mes = 'Setiembre, Octubre';
        } else if (mesSelect.value == 4) {
            mes = 'Noviembre';
        }

        let errores = false;

        // Limpiar estilos de error previos y mensajes
        formulario.querySelectorAll('input, select, textarea').forEach(input => {
            input.classList.remove('error-input');
        });
        contenedorMensajes.innerHTML = ''; // Limpiar mensajes anteriores

        campos.forEach(campo => {
            if (!campo.value.trim() && campo.id !== 'conceptos') {
                mostrarErrorCampo(campo, `Por favor completa el campo ${obtenerNombreCampo(campo.id)}.`);
                errores = true;
            } else if (campo.id === 'mes' && campo.value == 0) {
                mostrarErrorCampo(campo, 'Selecciona un mes.');
                errores = true;
            }
        });

        if (errores) {
            mostrarMensajeError('Por favor completa todos los campos obligatorios.', botonRegistrarNota);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/notascarne`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    alumnoId: alumnoId.value,
                    grado: grado.value,
                    mes: mes,
                    comprension_lectura: comprension_lectura.value,
                    produccion_texto: produccion_texto.value,
                    produccion_oral: produccion_oral.value,
                    comprension_auditiva: comprension_auditiva.value,
                    tareas: tareas.value,
                    escritos: escritos.value,
                    conceptos: document.getElementById('conceptos').value.trim()
                })
            });

            const data = await response.json();

            if (response.ok) {
                mostrarMensajeExito('Nota ingresada con éxito.');
                // Limpiar los campos
                formulario.querySelectorAll('input:not([type="hidden"]), select, textarea').forEach(input => input.value = '');
            } else {
                mostrarMensajeError('Error al registrar la nota: ' + (data.mensaje || 'Error desconocido.'), botonRegistrarNota);
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            mostrarMensajeError('Error al conectar con el servidor.', botonRegistrarNota);
        }
    });

    function obtenerNombreCampo(id) {
        switch (id) {
            case 'alumnoId': return 'alumno';
            case 'grado': return 'grado';
            case 'mes': return 'mes';
            case 'comprension_lectura': return 'comprensión lectora';
            case 'produccion_texto': return 'producción de texto';
            case 'produccion_oral': return 'producción oral';
            case 'comprension_auditiva': return 'comprensión auditiva';
            case 'tareas': return 'tareas domiciliarias';
            case 'escritos': return 'escritos';
            default: return id;
        }
    }

    function mostrarErrorCampo(campo, mensaje) {
        campo.classList.add('error-input');
        // campo.focus(); // Eliminar esta línea
        setTimeout(() => campo.classList.remove('error-input'), 4000);
    }

    function mostrarMensajeError(mensaje, elementoReferencia) {
        const mensajeError = document.createElement('span');
        mensajeError.className = 'error-message';
        mensajeError.textContent = mensaje;
        // Utilizar el contenedor para mostrar el mensaje
        contenedorMensajes.appendChild(mensajeError);
        setTimeout(() => mensajeError.remove(), 4000);
    }

    function mostrarMensajeExito(mensaje) {
        const body = document.body;
        const fondoOscuro = document.createElement('div');
        fondoOscuro.className = 'fondo-oscuro-exito';

        const ventanaEmergente = document.createElement('div');
        ventanaEmergente.className = 'ventana-emergente-exito';
        ventanaEmergente.innerHTML = `<p>${mensaje}</p>`;

        body.appendChild(fondoOscuro);
        body.appendChild(ventanaEmergente);

        setTimeout(() => {
            ventanaEmergente.remove();
            fondoOscuro.remove();
        }, 4000);
    }
});