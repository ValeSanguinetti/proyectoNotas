const express = require('express');
const cors = require('cors');
const conexion = require('./db/conexion');

const alumnosRoutes = require('./Rutas/AlumnosRutas');
const notas_carneRoutes= require('./Rutas/NotaCarneRuta');
const escritosRoutes= require('./Rutas/EscritosRutas');
const usuarioRoutes= require('./Rutas/UsuariosRutas');
const pdfRoutes= require('./Rutas/pdfRutas');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middleware para permitir mostrar archivos PDF en iframe
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'ALLOWALL'); // Permite mostrar en iframes
  res.setHeader('Content-Security-Policy', "frame-ancestors *"); // Navegadores modernos
  next();
});

// Rutas
app.use((req, res, next) => {
    console.log(`⚡ Llega una petición: ${req.method} ${req.url}`);
    next(); // Importantísimo: pasar al siguiente middleware
});


app.use('/public', express.static('public'));

app.get('/prueba', (req, res) => {
    res.send('✅ Ruta de prueba funcionando correctamente.');
});
app.use('/api', alumnosRoutes);
app.use('/api', notas_carneRoutes);
app.use('/api',escritosRoutes);
app.use('/api',usuarioRoutes);
app.use('/api',pdfRoutes);
// Servidor
app.listen(4000, () => {
    console.log('Servidor corriendo en http://localhost:4000');
});
