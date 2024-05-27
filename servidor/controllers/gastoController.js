const Gasto = require("../models/Gasto");

exports.crearGasto = async (req, res) => {
    
    try {
        let gasto;

        gasto = new Gasto(req.body);

        await gasto.save();
        res.send(gasto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.obtenerGastos = async (req, res) => {
    
    try {
    
        const gastos = await Gasto.find();
        res.json(gastos);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarGasto = async (req, res) => {

    try {
        const { concepto, monto, fecha, categoria } = req.body;
        let gasto = await Gasto.findById(req.params.id);

        if(!gasto) {
            res.status(404).json({ msg: 'No existe el gasto' })
        }

        gasto.concepto = concepto;
        gasto.monto = monto;
        gasto.fecha = fecha;
        gasto.categoria = categoria;

        gasto = await Gasto.findOneAndUpdate({ _id: req.params.id },gasto, { new: true} )
        res.json(gasto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerGasto = async (req, res) => {

    try {
        let gasto = await Gasto.findById(req.params.id);

        if(!gasto) {
            res.status(404).json({ msg: 'No existe el gasto' })
        }
       
        res.json(gasto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarGasto = async (req, res) => {

    try {
        let gasto = await Gasto.findById(req.params.id);

        if(!gasto) {
            res.status(404).json({ msg: 'No existe el gasto' })
        }
       
        await Gasto.findOneAndDelete({ _id: req.params.id })
        res.json({ msg: 'Gasto eliminado con exito' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}