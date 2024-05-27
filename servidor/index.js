const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const app = express();

conectarDB();

app.use(cors());

app.use(express.json());

app.use('/api/usuarios', require('./routes/usuario'));

app.use('/api/gastos', require('./routes/gasto'));

app.use('/api/ingresos', require('./routes/ingreso'));

app.use('/api/proveedores', require('./routes/proveedor'));

app.use('/api/clientes', require('./routes/cliente'));

app.use('/api/reportes', require('./routes/reporte'));

app.use('/api/usuarios/configuracion', require('./routes/configuracion'));

app.listen(4000, () => {
    console.log('El servidor está corriendo perfectamente');
})