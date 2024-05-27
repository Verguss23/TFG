const express = require('express');
const router = express.Router();

const configuracionController = require('../controllers/configuracionController');

router.post('/', configuracionController.guardarConfiguracion);

module.exports = router;