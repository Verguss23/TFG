const mongoose = require('mongoose');

const ProveedorSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    contacto: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Proveedor', ProveedorSchema);