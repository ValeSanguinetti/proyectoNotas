const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: '161.0.125.70',
    user: 'englishc_db_user',
    password: 'zprkNh;YWg39pUz@',
    database: 'englishc_BD_Selva',
    port: 3306
});

conexion.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MySQL ✅');
    }
});

module.exports = conexion;
