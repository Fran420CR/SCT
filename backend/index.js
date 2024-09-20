// Importaciones necesarias
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();



// Crear el servidor/Aplicacion de Express
const app = express();

// CORS
app.use( cors() );

// Lectura y Parseo del body
app.use( express.json() );

// Rutas
app.use( '/api/auth', require('./routes/auth'));
app.use( '/api/areas', require('./routes/areas'));
app.use( '/api/tramites', require('./routes/tramites'));
app.use( '/api/clientes', require('./routes/clientes'));
app.use( '/api/registroEntrada', require('./routes/registroEntrada'));
app.use( '/api/registroTramite', require('./routes/registroTramite'));
app.use( '/api/tramites-areas', require('./routes/tramites-areas'));
app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/roles', require('./routes/roles'));
app.use( '/api/reporte', require('./routes/reporte'));





// Apertura del puerto en escucha
app.listen( process.env.PORT , ()=>{
    console.log(`Servidor corriendo en el puerto -> ${ process.env.PORT }`)
});

