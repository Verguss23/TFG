const Reporte = require("../models/Reporte");

exports.crearReporte = async (req, res) => {
    
    try {
        let reporte;

        reporte = new Reporte(req.body);

        await reporte.save();
        res.send(reporte);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.obtenerReportes = async (req, res) => {
    
    try {
    
        const reportes = await Reporte.find();
        res.json(reportes);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarReporte = async (req, res) => {

    try {
        const { tipo, inicio, fin } = req.body;
        let reporte = await Reporte.findById(req.params.id);

        if(!reporte) {
            res.status(404).json({ msg: 'No existe el reporte' })
        }

        reporte.tipo = tipo;
        reporte.inicio = inicio;
        reporte.fin = fin;

        reporte = await Reporte.findOneAndUpdate({ _id: req.params.id },reporte, { new: true} )
        res.json(reporte);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerReporte = async (req, res) => {

    try {
        let reporte = await Reporte.findById(req.params.id);

        if(!reporte) {
            res.status(404).json({ msg: 'No existe el reporte' })
        }
       
        res.json(reporte);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarReporte = async (req, res) => {

    try {
        let reporte = await Reporte.findById(req.params.id);

        if(!reporte) {
            res.status(404).json({ msg: 'No existe el reporte' })
        }
       
        await Reporte.findOneAndDelete({ _id: req.params.id })
        res.json({ msg: 'Reporte eliminado con exito' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}