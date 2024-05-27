const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/', usuarioController.crearUsuario);
router.get('', usuarioController.obtenerUsuarios);
router.put('/:id', usuarioController.actualizarUsuario);
router.get('/:id', usuarioController.obtenerUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);

router.post('/login', usuarioController.validarUsuario);

module.exports = router;