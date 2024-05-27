const Usuario = require('../models/Usuario');

exports.guardarConfiguracion = async (req, res) => {
  try {
    const userId = 1; 

    const configuracion = req.body;

    res.status(200).json({ mensaje: 'Configuración guardada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al guardar la configuración' });
  }
};
