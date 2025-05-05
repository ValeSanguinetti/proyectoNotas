document.addEventListener('DOMContentLoaded', () => {
    const alumnoId = localStorage.getItem('alumno_id');

    if (!alumnoId) {
        alert("No se encontró el ID del alumno en el almacenamiento local.");
        return;
    }

    fetch('http://localhost:4000/api/escritos/publicados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ alumnoId })  // Aquí se pasa en el body
    })
    .then(response => response.json())
    .then(data => {
        const tablaBody = document.getElementById('tabla-escritos-body');
        tablaBody.innerHTML = '';

        if (data.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 3;
            cell.textContent = 'No hay escritos publicados para este alumno.';
            row.appendChild(cell);
            tablaBody.appendChild(row);
            return;
        }

        data.forEach(escrito => {
            const row = document.createElement('tr');

            const nombreCell = document.createElement('td');
            nombreCell.textContent = escrito.nombre;

            const fechaCell = document.createElement('td');
            const fechaFormateada = new Date(escrito.fecha).toLocaleDateString();
            fechaCell.textContent = fechaFormateada;

            const notaCell = document.createElement('td');
            notaCell.textContent = escrito.nota;

            row.appendChild(nombreCell);
            row.appendChild(fechaCell);
            row.appendChild(notaCell);

            tablaBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error al cargar escritos:', error);
    });
});
