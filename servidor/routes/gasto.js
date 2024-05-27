const express = require('express');
const router = express.Router();
const gastoController = require('../controllers/gastoController');

router.post('/', gastoController.crearGasto);
router.get('', gastoController.obtenerGastos);
router.put('/:id', gastoController.actualizarGasto);
router.get('/:id', gastoController.obtenerGasto);
router.delete('/:id', gastoController.eliminarGasto);

module.exports = router;