const Usuario = require("../models/Usuario");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const claveSecreta = '1234';

exports.crearUsuario = async (req, res) => {
  try {
      const { username, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const usuario = new Usuario({
          username,
          password: hashedPassword
      });

      await usuario.save();
      res.send(usuario);
      
  } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
  }
}

exports.obtenerUsuarios = async (req, res) => {
    
  try {
  
      const usuarios = await Usuario.find();
      res.json(usuarios);
      
  } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
  }

}

exports.actualizarUsuario = async (req, res) => {
  try {
      const { username, password } = req.body;
      let usuario = await Usuario.findById(req.params.id);

      if (!usuario) {
          return res.status(404).json({ msg: 'No existe el usuario' });
      }

      if (password) {
          usuario.password = await bcrypt.hash(password, 10);
      }
      
      usuario.username = username;
      usuario = await Usuario.findOneAndUpdate({ _id: req.params.id }, usuario, { new: true });
      res.json(usuario);
    
  } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
  }
}

exports.obtenerUsuario = async (req, res) => {

  try {
      let usuario = await Usuario.findById(req.params.id);

      if(!usuario) {
          res.status(404).json({ msg: 'No existe el usuario' })
      }
     
      res.json(usuario);
      
  } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
  }
}

exports.eliminarUsuario = async (req, res) => {

  try {
      let usuario = await Usuario.findById(req.params.id);

      if(!usuario) {
          res.status(404).json({ msg: 'No existe el usuario' })
      }
     
      await Usuario.findOneAndDelete({ _id: req.params.id })
      res.json({ msg: 'Usuario eliminado con exito' });
      
  } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
  }
}

exports.validarUsuario = async (req, res) => {
  const { username, password } = req.body;
  try {
      const usuario = await Usuario.findOne({ username });
      if (usuario) {
          const passwordMatch = await bcrypt.compare(password, usuario.password);
          if (passwordMatch) {
            const token = jwt.sign({ username: usuario.username, id: usuario._id }, claveSecreta, { expiresIn: '1h' });
            res.status(200).json({ token });
          } else {
              res.status(401).json({ message: 'Credenciales inválidas' });
          }
      } else {
          res.status(401).json({ message: 'Credenciales inválidas' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error del servidor' });
  }
};
