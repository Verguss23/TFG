const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    configuracion: {
        type: Object,
        default: {}
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);