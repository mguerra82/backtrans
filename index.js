require('dotenv').config();

const express = require('express');
const cors = require('cors');


/**
 * Crea el servidor.
 */
const app = express();
/**
 * Configuracion de CORS.
 */
app.use(cors());

app.use(express.json());

app.use('/api/login', require('./routes/auth'));

/**
 * Catalogos.
 */
app.use('/api/tipoCamion', require('./routes/tipoCamion'));
app.use('/api/camion', require('./routes/camion'));
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/empleado', require('./routes/empleado'));
app.use('/api/piloto', require('./routes/piloto'));
app.use('/api/trans', require('./routes/transportista'));
app.use('/api/tipoAnticipo', require('./routes/tipoAnticipo'));
app.use('/api/producto', require('./routes/producto'));

/**
 * Procesos
 */

app.use('/api/proc/polizaEnc', require('./routes/procPolizaEnc'));

/**
 * Server
 */
app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto, ', process.env.PORT);
});