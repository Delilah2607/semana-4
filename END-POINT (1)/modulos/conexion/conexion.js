const mysql = require('mysql2');

// Crea una conexión a la base de datos
const conexion = mysql.createConnection({
    host: '192.168.137.18',
    user: 'sakila',
    password: '12345678.',
    database: 'sakila'
});

// Conecta a la base de datos
conexion.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ', err);
        return;
    }
    console.log('Conectado a la base de datos.');
});

module.exports = conexion;