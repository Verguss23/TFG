    const mongoose = require('mongoose');

    const ReporteSchema = mongoose.Schema({
        tipo: {
            type: String,
            required: true
        },
        inicio: {
            type: Date,
            required: true
        },
        fin: {
            type: Date,
            required: true
        },
    });

    module.exports = mongoose.model('Reporte', ReporteSchema);