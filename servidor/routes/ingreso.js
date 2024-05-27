const express = require('express');
const router = express.Router();
const ingresoController = require('../controllers/ingresoController');

router.post('/', ingresoController.crearIngreso);
router.get('', ingresoController.obtenerIngresos);
router.put('/:id', ingresoController.actualizarIngreso);
router.get('/:id', ingresoController.obtenerIngreso);
router.delete('/:id', ingresoController.eliminarIngreso);

module.exports = router;