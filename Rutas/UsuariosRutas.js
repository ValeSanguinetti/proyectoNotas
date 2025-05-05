const express = require('express');
const router = express.Router();
const usuarioController = require('../Controllers/UsuarioController');

// Rutas para usuarios
router.post('/usuarios', usuarioController.guardarUsuario);
router.get('/usuarios', usuarioController.listarUsuarios);
router.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId);
router.put('/usuarios/:id', usuarioController.actualizarUsuario);
router.delete('/usuarios/:id', usuarioController.eliminarUsuario);
router.post('/login', usuarioController.loginUsuario);

module.exports = router;
