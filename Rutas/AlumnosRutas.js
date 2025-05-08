const express = require('express');
const router = express.Router();
const  Alumnocontroller  = require('../Controllers/AlumnosController');


// Ruta para guardar alumno
router.post('/alumnos',Alumnocontroller.guardarAlumno);
// En tu archivo de rutas (AlumnosRutas.js)
router.get('/alumnos', (req, res) => {
    console.log('Petición GET /api/alumnos recibida');
   Alumnocontroller.listarAlumnos(req, res);
  });


// Ruta para eliminar un alumno por su ID
router.delete('/alumnos/:id',Alumnocontroller.eliminarAlumno);

// Ruta para listar alumnos inactivos
router.get('/alumnos/inactivos',Alumnocontroller.listarAlumnosInactivos);

// Ruta para activar un alumno por su ID
router.put('/alumnos/:id/activar',Alumnocontroller.activarAlumno);
router.put('/alumnos/editar/:id',Alumnocontroller.editarAlumno);
router.post('/alumnos/Listar-por-grupo', Alumnocontroller.listarAlumnosPorGrupo);
router.get('/gruposunicos',Alumnocontroller.listarGruposUnicos);
router.get('/alumnos/:id', Alumnocontroller.buscarAlumnoPorId);
module.exports = router;

