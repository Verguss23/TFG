const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

router.post('/', reporteController.crearReporte);
router.get('', reporteController.obtenerReportes);
router.put('/:id', reporteController.actualizarReporte);
router.get('/:id', reporteController.obtenerReporte);
router.delete('/:id', reporteController.eliminarReporte);

module.exports = router;