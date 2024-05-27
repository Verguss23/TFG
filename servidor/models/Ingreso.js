const mongoose = require('mongoose');

const IngresoSchema = mongoose.Schema({
    monto: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Ingreso', IngresoSchema);