const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'centerbeam.proxy.rlwy.net',
    user: 'root',
    password: 'MHwUEMfJLPsfROiNPlktVbiLfegxdcir',
    database: 'railway',
    port: 55896
});

conexion.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MySQL ✅');
    }
});

module.exports = conexion;
