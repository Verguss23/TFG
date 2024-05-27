const Cliente = require("../models/Cliente");

exports.crearCliente = async (req, res) => {
    
    try {
        let cliente;

        cliente = new Cliente(req.body);

        await cliente.save();
        res.send(cliente);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.obtenerClientes = async (req, res) => {
    
    try {
    
        const clientes = await Cliente.find();
        res.json(clientes);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarCliente = async (req, res) => {

    try {
        const { nombre, email, telefono } = req.body;
        let cliente = await Cliente.findById(req.params.id);

        if(!cliente) {
            res.status(404).json({ msg: 'No existe el cliente' })
        }

        cliente.nombre = nombre;
        cliente.email = email;
        cliente.telefono = telefono;

        cliente = await Cliente.findOneAndUpdate({ _id: req.params.id },cliente, { new: true} )
        res.json(cliente);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerCliente = async (req, res) => {

    try {
        let cliente = await Cliente.findById(req.params.id);

        if(!cliente) {
            res.status(404).json({ msg: 'No existe el cliente' })
        }
       
        res.json(cliente);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarCliente = async (req, res) => {

    try {
        let cliente = await Cliente.findById(req.params.id);

        if(!cliente) {
            res.status(404).json({ msg: 'No existe el cliente' })
        }
       
        await Cliente.findOneAndDelete({ _id: req.params.id })
        res.json({ msg: 'Cliente eliminado con exito' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}