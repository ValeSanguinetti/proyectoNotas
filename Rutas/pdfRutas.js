const express = require('express');
const router = express.Router();
const pdfController = require('../Controllers/pdfController');

router.post('/rellenar-pdf', pdfController.crearcarne);
router.post('/vercarne/publicado',pdfController.crearcarnepublicado);

module.exports = router;
