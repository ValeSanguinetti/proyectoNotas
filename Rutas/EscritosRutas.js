const express = require('express');
const router = express.Router();
const EscritosController= require('../Controllers/EscritosController');

router.post('/escritos', EscritosController.guardarEscrito);
router.get('/escritos', (req, res) => {
    EscritosController.listarEscritos(req, res);
  });
  router.get('/escritos/inactivos', (req, res) => {
    EscritosController.listarEscritosInactivos(req, res);
  });
router.get('/escritosnombres',EscritosController.listarNombresUnicosEscritos);
router.post('/escritos/publicar', EscritosController.publicarEscritosPorNombre);
router.post('/escritos/publicados',EscritosController.listarEscritosPublicadosPorAlumno);

// Ruta para eliminar un alumno por su ID
router.delete('/escritos/:id',EscritosController.eliminarEscrito);
router.get('/escritos/:id', EscritosController.buscarEscritoPorId);
router.put('/escritos/editar/:id', EscritosController.editarEscrito);

router.put('/escritos/activar/:id', EscritosController.ActivarEscrito);
module.exports = router;

