const Ingreso = require("../models/Ingreso");

exports.crearIngreso = async (req, res) => {
    
    try {
        let ingreso;

        ingreso = new Ingreso(req.body);

        await ingreso.save();
        res.send(ingreso);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.obtenerIngresos = async (req, res) => {
    
    try {
    
        const ingresos = await Ingreso.find();
        res.json(ingresos);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarIngreso = async (req, res) => {

    try {
        const { monto, descripcion, fecha } = req.body;
        let ingreso = await Ingreso.findById(req.params.id);

        if(!ingreso) {
            res.status(404).json({ msg: 'No existe el ingreso' })
        }

        ingreso.monto = monto;
        ingreso.descripcion = descripcion;
        ingreso.fecha = fecha;

        ingreso = await Ingreso.findOneAndUpdate({ _id: req.params.id },ingreso, { new: true} )
        res.json(ingreso);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerIngreso = async (req, res) => {

    try {
        let ingreso = await Ingreso.findById(req.params.id);

        if(!ingreso) {
            res.status(404).json({ msg: 'No existe el ingreso' })
        }
       
        res.json(ingreso);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarIngreso = async (req, res) => {

    try {
        let ingreso = await Ingreso.findById(req.params.id);

        if(!ingreso) {
            res.status(404).json({ msg: 'No existe el ingreso' })
        }
       
        await Ingreso.findOneAndDelete({ _id: req.params.id })
        res.json({ msg: 'Ingreso eliminado con exito' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}