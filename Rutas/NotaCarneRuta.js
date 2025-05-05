const express = require('express');
const router = express.Router();
const notaCarneController = require('../Controllers/NotaCarneController');

router.post('/notascarne', notaCarneController.guardarNotaCarne);
router.get('/notascarne', (req, res) => {
    console.log('Petición GET /api/notascarne');
    notaCarneController.listarNotasCarne(req, res);
  });
router.get('/notascarne/actual',notaCarneController.listarNotasCarneActual);
router.post('/notascarne/publicar', notaCarneController.publicarNotasPorMes);
module.exports = router;

