const mongoose = require('mongoose');

const GastoSchema = mongoose.Schema({
    concepto: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    categoria: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Gasto', GastoSchema);