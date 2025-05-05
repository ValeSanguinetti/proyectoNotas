const conexion = require('../db/conexion');
const Usuario = require('../Models/Usuarios');

const bcrypt = require('bcrypt');

const guardarUsuario = async (req, res) => {
    const { nombreCompleto, ci, alumnoId, usuario, contrasena, correo } = req.body;

    // Encriptar la contraseña antes de guardarla
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    const obtenerPerfilIdSql = `SELECT id FROM perfilUsuario WHERE rol = 'user' LIMIT 1`;

    conexion.query(obtenerPerfilIdSql, (error, resultadosPerfil) => {
        if (error) {
            console.error('Error al obtener el perfil:', error);
            return res.status(500).json({ mensaje: 'Error al obtener el perfil' });
        }

        if (resultadosPerfil.length === 0) {
            return res.status(400).json({ mensaje: 'Perfil "user" no encontrado' });
        }

        const perfilId = resultadosPerfil[0].id;

        const sql = `
            INSERT INTO usuarios (nombre_completo, ci, alumno_id, usuario, contrasena, correo, perfil_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const valores = [
            nombreCompleto,
            ci,
            alumnoId,
            usuario,
            hashedPassword, // Guardamos la contraseña encriptada
            correo,
            perfilId
        ];

        conexion.query(sql, valores, (error, resultados) => {
            if (error) {
                console.error('Error al guardar el usuario:', error);
                res.status(500).json({ mensaje: 'Error al guardar el usuario' });
            } else {
                res.status(201).json({
                    mensaje: 'Usuario guardado correctamente',
                    id: resultados.insertId
                });
            }
        });
    });
};


// Listar usuarios con el nombre del alumno
const listarUsuarios = (req, res) => {
    const sql = `
        SELECT u.*, a.nombreCompleto
        FROM usuarios u
        INNER JOIN Alumnos a ON u.alumno_id = a.id
        ORDER BY u.nombre_completo ASC
    `;

    conexion.query(sql, (error, resultados) => {
        if (error) {
            console.error('Error al listar los usuarios:', error);
            res.status(500).json({ mensaje: 'Error al listar los usuarios' });
        } else {
            res.status(200).json(resultados);
        }
    });
};

// Obtener un usuario por su ID
const obtenerUsuarioPorId = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT u.*, a.nombreCompleto
        FROM usuarios u
        INNER JOIN Alumnos a ON u.alumno_id = a.id
        WHERE u.id = ?
    `;

    conexion.query(sql, [id], (error, resultados) => {
        if (error) {
            console.error('Error al obtener el usuario:', error);
            res.status(500).json({ mensaje: 'Error al obtener el usuario' });
        } else {
            if (resultados.length > 0) {
                res.status(200).json(resultados[0]);
            } else {
                res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
        }
    });
};

// Actualizar un usuario
const actualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nombreCompleto, ci, alumnoId, usuario, contrasena, correo } = req.body;

    const sql = `
        UPDATE usuarios
        SET nombre_completo = ?, ci = ?, alumno_id = ?, usuario = ?, contrasena = ?, correo = ?
        WHERE id = ?
    `;

    const valores = [
        nombreCompleto,
        ci,
        alumnoId,
        usuario,
        contrasena,
        correo,
        id
    ];

    conexion.query(sql, valores, (error, resultados) => {
        if (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
        } else {
            if (resultados.affectedRows > 0) {
                res.status(200).json({ mensaje: 'Usuario actualizado correctamente' });
            } else {
                res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
        }
    });
};

// Eliminar un usuario
const eliminarUsuario = (req, res) => {
    const { id } = req.params;

    const sql = `
        DELETE FROM usuarios
        WHERE id = ?
    `;

    conexion.query(sql, [id], (error, resultados) => {
        if (error) {
            console.error('Error al eliminar el usuario:', error);
            res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
        } else {
            if (resultados.affectedRows > 0) {
                res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
            } else {
                res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
        }
    });
};

const loginUsuario = (req, res) => {
    const { usuario, contrasena } = req.body;


    const sql = `SELECT * FROM usuarios WHERE usuario = ?`;

    conexion.query(sql, [usuario], async (error, resultados) => {
        if (error) {
            console.error('Error al iniciar sesión:', error);
            return res.status(500).json({ mensaje: 'Error del servidor' });
        }

        if (resultados.length === 0) {
            return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
        }

        const usuarioDB = resultados[0];

        // Comparar contraseña ingresada con la encriptada
        const passwordMatch = await bcrypt.compare(contrasena, usuarioDB.contrasena);

        if (!passwordMatch) {
            return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
        }

        // Opcional: eliminar la contraseña antes de devolver el usuario
        delete usuarioDB.contrasena;
        const sqlRol = `SELECT rol FROM perfilUsuario WHERE id = ?`;
        const alumnoid= usuarioDB.alumno_id;
        conexion.query(sqlRol, [usuarioDB.perfil_id], (errorRol, resultadosRol) => {
            if (errorRol) {
                console.error('Error al obtener el rol:', errorRol);
                return res.status(500).json({ mensaje: 'Error al obtener el rol' });
            }

            if (resultadosRol.length === 0) {
                return res.status(500).json({ mensaje: 'Rol no encontrado' });
            }

            const rol = resultadosRol[0].rol;

            res.status(200).json({
                mensaje: 'Inicio de sesión exitoso',
                usuario: usuarioDB,
                rol: rol,
                alumno_id:alumnoid
            });
        });
    });
};


module.exports = {
    guardarUsuario,
    listarUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario,
    loginUsuario,
};
