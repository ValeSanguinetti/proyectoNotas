import API_BASE_URL from './config.js';

document.addEventListener('DOMContentLoaded', function () {
    const alumnoId = localStorage.getItem('alumno_id');
    const verCarneLink = document.getElementById('verCarneLink');

    if (verCarneLink) {
        verCarneLink.addEventListener('click', async () => {
            const alumnoId = localStorage.getItem('alumno_id');

                try {
                    const response = await fetch(`${API_BASE_URL}/api/vercarne/publicado`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ alumnoId })
                    });

                    const data = await response.json();
                    if (response.ok) {
                       
                        // Redirige a la pantalla de ver-pdf.html con la URL del PDF como parámetro
                        window.location.href = `ver_pdf.html?pdfUrl=${encodeURIComponent(data.urlPdf)}`;
                    } else {
                        alert(data.mensaje || 'Error al generar el carné.');
                    }
        
                } catch (error) {
                    console.error('Error al generar el carné:', error);
                    alert('Error al generar el carné.');
                }
            });
    }
});