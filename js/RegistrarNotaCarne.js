/*
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



document.addEventListener('DOMContentLoaded', function () {
    const botonRegistrarNota = document.querySelector('.button-registrar');

        botonRegistrarNota.addEventListener('click', async function (event) {
            event.preventDefault(); // 🔥 Esto evita que el formulario se envíe y recargue la página
        
        const alumnoId = document.getElementById('alumnoId').value;
        const grado = document.getElementById('grado').value.trim();
        const messelect = document.getElementById('mes').value;
        const comprension_lectura = document.getElementById('comprension_lectura').value.trim();
        const produccion_texto = document.getElementById('produccion_texto').value.trim();
        const produccion_oral = document.getElementById('produccion_oral').value.trim();
        const comprension_auditiva = document.getElementById('comprension_auditiva').value.trim();
        const tareas = document.getElementById('tareas').value.trim();
        const escritos = document.getElementById('escritos').value.trim();
        const conceptos = document.getElementById('conceptos').value;
        var mes='';
        if (messelect==1){
            mes='Marzo, Abril, Mayo'
        }else if(messelect==2){
            mes='Junio, Julio, Agosto';
        } else if(messelect==3){
            mes='Setiembre, Octubre';
        }else if(messelect==4){
            mes='Noviembre'
        }
        if (!alumnoId || !grado || messelect==0) {
            alert('Por favor completa todos los campos obligatorios.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/notascarne`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    alumnoId: alumnoId,
                    grado: grado,
                    mes: mes,
                    comprension_lectura: comprension_lectura,
                    produccion_texto: produccion_texto,
                    produccion_oral: produccion_oral,
                    comprension_auditiva: comprension_auditiva,
                    tareas: tareas,
                    escritos: escritos,
                    conceptos: conceptos
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Nota registrada exitosamente.');
                // Limpiar los campos
                console.log("GUARDADO");
            } else {
                alert('Error al registrar la nota: ' + (data.mensaje || 'Error desconocido.'));
            }
        } catch (error) {
            console.print('Error al conectar con el servidor:', error);
            alert('Error al conectar con el servidor.');
        }
    });
});
*/

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
        mostrarMensajeError('No se pudieron cargar los alumnos.', document.querySelector('.button-registrar'));
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const botonRegistrarNota = document.querySelector('.button-registrar');
    const formulario = document.querySelector('.registrar-alumno-register-form');
    const contenedorMensajes = document.createElement('div'); // Crear un contenedor para los mensajes
    contenedorMensajes.className = 'contenedor-mensajes';  // Asignar una clase para estilos

    // Insertar el contenedor después del botón de registrar
    botonRegistrarNota.parentNode.insertBefore(contenedorMensajes, botonRegistrarNota.nextSibling);

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

const textarea = document.getElementById('conceptos');
  const contador = document.getElementById('contadorConceptos');
  const maxChars = 140;


  textarea.addEventListener('input', function () {
    const restante = maxChars - textarea.value.length;
    contador.textContent = `${restante}`;
  });
