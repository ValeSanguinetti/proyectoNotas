const conexion = require('../db/conexion');
const Escrito = require('../Models/Escritos');

// Guardar un nuevo 
const guardarEscrito = (req, res) => {
    const { nombre, fecha, nota, alumnoId } = req.body;
    const publicado = false;
    const estado = true;

    // Primero verificamos si ya existe un escrito con ese nombre para el alumno
    const sqlCheck = `
        SELECT * FROM escritos 
        WHERE nombre = ? AND alumno_id = ?
    `;

    conexion.query(sqlCheck, [nombre, alumnoId], (error, resultados) => {
        if (error) {
            console.error('Error al verificar el escrito:', error);
            return res.status(500).json({ mensaje: 'Error al verificar el escrito' });
        }

        if (resultados.length > 0) {
            return res.status(400).json({ mensaje: 'Ya existe un escrito con ese nombre para este alumno.' });
        }

        // Si no existe, procedemos a guardar
        const sqlInsert = `
            INSERT INTO escritos (nombre, fecha, nota, alumno_id, publicado, estado)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const valores = [nombre, fecha, nota, alumnoId, publicado, estado];

        conexion.query(sqlInsert, valores, (error, resultados) => {
            if (error) {
                console.error('Error al guardar el escrito:', error);
                res.status(500).json({ mensaje: 'Error al guardar el escrito' });
            } else {
                res.status(201).json({
                    mensaje: 'Escrito guardado correctamente',
                    id: resultados.insertId
                });
            }
        });
    });
};
const listarEscritosPorNombre = (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ mensaje: 'El nombre del escrito es requerido' });
    }

    const sql = `
        SELECT e.*, a.nombreCompleto
        FROM escritos e
        INNER JOIN Alumnos a ON e.alumno_id = a.id
        WHERE e.nombre = ? AND e.estado = 1
        ORDER BY e.fecha DESC
    `;

    conexion.query(sql, [nombre], (error, resultados) => {
        if (error) {
            console.error('Error al listar los escritos por nombre:', error);
            res.status(500).json({ mensaje: 'Error al listar los escritos por nombre' });
        } else {
            res.status(200).json(resultados);
        }
    });
};

const editarEscrito = (req, res) => {
    const { id } = req.params;
    const { nombre, fecha, nota } = req.body;

    if (!nombre || !fecha || !nota ) {
        return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
    }

    const sql = `
        UPDATE escritos
        SET nombre = ?, fecha = ?, nota = ?
        WHERE id = ?
    `;

    const valores = [nombre, fecha, nota, id];

    conexion.query(sql, valores, (error, resultados) => {
        if (error) {
            console.error('Error al editar el escrito:', error);
            res.status(500).json({ mensaje: 'Error al editar el escrito' });
        } else if (resultados.affectedRows === 0) {
            res.status(404).json({ mensaje: 'No se encontró un escrito activo con ese ID' });
        } else {
            res.status(200).json({ mensaje: 'Escrito actualizado correctamente' });
        }
    });
};

const eliminarEscrito = (req, res) => {
    const { id } = req.params; 

    const sql = 'UPDATE escritos SET estado = 0 WHERE id = ?';
    conexion.query(sql, [id], (error, resultados) => {
        if (error) {
            console.error('Error al eliminar el escrito:', error);
            res.status(500).json({ mensaje: 'Error al eliminar el escrito' });
        } else if (resultados.affectedRows === 0) {
            res.status(404).json({ mensaje: 'No se encontró ningún escrito con ese ID' });
        } else {
            res.status(200).json({ mensaje: 'Escrito eliminado correctamente' });
        }
    });
};
const ActivarEscrito = (req, res) => {
    const { id } = req.params; 

    const sql = 'UPDATE escritos SET estado = 1 WHERE id = ?';
    conexion.query(sql, [id], (error, resultados) => {
        if (error) {
            console.error('Error al eliminar el escrito:', error);
            res.status(500).json({ mensaje: 'Error al eliminar el escrito' });
        } else if (resultados.affectedRows === 0) {
            res.status(404).json({ mensaje: 'No se encontró ningún escrito con ese ID' });
        } else {
            res.status(200).json({ mensaje: 'Escrito eliminado correctamente' });
        }
    });
};
const publicarEscritosPorNombre = (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ mensaje: 'El nombre del escrito es requerido' });
    }

    const sql = `
        UPDATE escritos
        SET publicado = true
        WHERE nombre = ?
    `;

    conexion.query(sql, [nombre], (error, resultados) => {
        if (error) {
            console.error('Error al publicar los escritos:', error);
            res.status(500).json({ mensaje: 'Error al publicar los escritos' });
        } else {
            res.status(200).json({
                mensaje: `Se publicaron ${resultados.affectedRows} escritos con el nombre '${nombre}'`
            });
        }
    });
};

// Listar escritos con el nombre del alumno
const listarEscritos = (req, res) => {
    const sql = `
        SELECT e.*, a.nombreCompleto
        FROM escritos e
        INNER JOIN Alumnos a ON e.alumno_id = a.id
        where e.estado = 1
        ORDER BY e.fecha DESC
    `;

    conexion.query(sql, (error, resultados) => {
        if (error) {
            console.error('Error al listar los escritos:', error);
            res.status(500).json({ mensaje: 'Error al listar los escritos' });
        } else {
            res.status(200).json(resultados);
        }
    });
};

const listarEscritosInactivos = (req, res) => {
    const sql = `
        SELECT e.*, a.nombreCompleto
        FROM escritos e
        INNER JOIN Alumnos a ON e.alumno_id = a.id
        where e.estado = 0
        ORDER BY e.fecha DESC
    `;

    conexion.query(sql, (error, resultados) => {
        if (error) {
            console.error('Error al listar los escritos:', error);
            res.status(500).json({ mensaje: 'Error al listar los escritos' });
        } else {
            res.status(200).json(resultados);
        }
    });
};
const listarEscritosPublicadosPorAlumno = (req, res) => {
    const { alumnoId } = req.body;

    const sql = `
        SELECT e.*, a.nombreCompleto
        FROM escritos e
        INNER JOIN Alumnos a ON e.alumno_id = a.id
        WHERE e.alumno_id = ? AND e.publicado = 1 AND e.estado=1
        ORDER BY e.fecha DESC
    `;
    conexion.query(sql, [alumnoId], (error, resultados) => {
        if (error) {
            console.error('Error al listar escritos publicados por alumno:', error);
            res.status(500).json({ mensaje: 'Error al listar escritos' });
        } else {
            res.status(200).json(resultados);
        }
    });
};

const listarNombresUnicosEscritos = (req, res) => {
    const sql = `
        SELECT DISTINCT nombre
        FROM escritos
        ORDER BY nombre ASC
    `;

    conexion.query(sql, (error, resultados) => {
        if (error) {
            console.error('Error al obtener los nombres únicos de escritos:', error);
            res.status(500).json({ mensaje: 'Error al obtener nombres únicos' });
        } else {
            res.status(200).json(resultados);
        }
    });
};
const buscarEscritoPorId = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT e.*, a.nombreCompleto
        FROM escritos e
        INNER JOIN Alumnos a ON e.alumno_id = a.id
        WHERE e.id = ? AND e.estado = 1
    `;

    conexion.query(sql, [id], (error, resultados) => {
        if (error) {
            console.error('Error al buscar el escrito por ID:', error);
            res.status(500).json({ mensaje: 'Error al buscar el escrito' });
        } else if (resultados.length === 0) {
            res.status(404).json({ mensaje: 'Escrito no encontrado' });
        } else {
            res.status(200).json(resultados[0]);
        }
    });
};

module.exports = {
    guardarEscrito,
    listarEscritos,
    listarNombresUnicosEscritos,
    publicarEscritosPorNombre,
    listarEscritosPublicadosPorAlumno,
    eliminarEscrito,
    listarEscritosInactivos,
    buscarEscritoPorId,
    editarEscrito,
    ActivarEscrito,
    listarEscritosPorNombre
};
