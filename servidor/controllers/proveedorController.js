const Proveedor = require("../models/Proveedor");

exports.crearProveedor = async (req, res) => {
    
    try {
        let proveedor;

        proveedor = new Proveedor(req.body);

        await proveedor.save();
        res.send(proveedor);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.obtenerProveedores = async (req, res) => {
    
    try {
    
        const proveedores = await Proveedor.find();
        res.json(proveedores);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarProveedor = async (req, res) => {

    try {
        const { nombre, contacto, telefono } = req.body;
        let proveedor = await Proveedor.findById(req.params.id);

        if(!proveedor) {
            res.status(404).json({ msg: 'No existe el proveedor' })
        }

        proveedor.nombre = nombre;
        proveedor.contacto = contacto;
        proveedor.telefono = telefono;

        proveedor = await Proveedor.findOneAndUpdate({ _id: req.params.id },proveedor, { new: true} )
        res.json(proveedor);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProveedor = async (req, res) => {

    try {
        let proveedor = await Proveedor.findById(req.params.id);

        if(!proveedor) {
            res.status(404).json({ msg: 'No existe el proveedor' })
        }
       
        res.json(proveedor);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarProveedor = async (req, res) => {

    try {
        let proveedor = await Proveedor.findById(req.params.id);

        if(!proveedor) {
            res.status(404).json({ msg: 'No existe el proveedor' })
        }
       
        await Proveedor.findOneAndDelete({ _id: req.params.id })
        res.json({ msg: 'Proveedor eliminado con exito' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}