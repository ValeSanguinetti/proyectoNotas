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
