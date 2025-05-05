const conexion = require('../db/conexion');
const Alumno = require('../Models/Alumnos');

// Función para guardar un alumno
const guardarAlumno = (req, res) => {
    const { ci, nombreCompleto } = req.body;
    const estado= true;
    const nuevoAlumno = new Alumno(null, ci, nombreCompleto,estado);

    const sql = 'INSERT INTO Alumnos (ci, nombreCompleto, estado) VALUES (?, ?, ?)';
    conexion.query(sql, [nuevoAlumno.ci, nuevoAlumno.nombreCompleto, nuevoAlumno.estado], (error, resultados) => {
        if (error) {
            console.error('Error al guardar el alumno:', error);
            res.status(500).json({ mensaje: 'Error al guardar el alumno' });
        } else {
            res.status(201).json({ mensaje: 'Alumno guardado correctamente', id: resultados.insertId });
        }
    });
};
// Agregamos listarAlumnos al mismo archivo

// Función para listar todos los alumnos
const listarAlumnos = (req, res) => {
    const sql = 'SELECT * FROM Alumnos where estado=1';
    conexion.query(sql, (error, resultados) => {
        if (error) {
            console.error('Error al listar los alumnos:', error);
            res.status(500).json({ mensaje: 'Error al listar los alumnos' });
        } else {
            res.status(200).json(resultados);
        }
    });
};


// Función para eliminar un alumno 
const eliminarAlumno = (req, res) => {
    const { id } = req.params; // Suponemos que el ID del alumno viene en los parámetros de la ruta

    const sql = 'UPDATE Alumnos SET estado = 0 WHERE id = ?';
    conexion.query(sql, [id], (error, resultados) => {
        if (error) {
            console.error('Error al eliminar el alumno:', error);
            res.status(500).json({ mensaje: 'Error al eliminar el alumno' });
        } else if (resultados.affectedRows === 0) {
            res.status(404).json({ mensaje: 'No se encontró ningún alumno con ese ID' });
        } else {
            res.status(200).json({ mensaje: 'Alumno eliminado correctamente' });
        }
    });
};

// Función para listar todos los alumnos inactivos
const listarAlumnosInactivos = (req, res) => {
    const sql = 'SELECT * FROM Alumnos where estado=0';
    conexion.query(sql, (error, resultados) => {
        if (error) {
            console.error('Error al listar los alumnos inactivos:', error);
            res.status(500).json({ mensaje: 'Error al listar los alumnos inactivos' });
        } else {
            res.status(200).json(resultados);
        }
    });
};

// Función para activar un alumno
const activarAlumno = (req, res) => {
    const { id } = req.params;

    const sql = 'UPDATE Alumnos SET estado = 1 WHERE id = ?';
    conexion.query(sql, [id], (error, resultados) => {
        if (error) {
            console.error('Error al activar el alumno:', error);
            res.status(500).json({ mensaje: 'Error al activar el alumno' });
        } else if (resultados.affectedRows === 0) {
            res.status(404).json({ mensaje: 'No se encontró ningún alumno con ese ID' });
        } else {
            res.status(200).json({ mensaje: 'Alumno activado correctamente' });
        }
    });
};

// Función para editar un alumno
const editarAlumno = (req, res) => {
    const { id } = req.params;
    const { ci, nombreCompleto } = req.body;

    const sql = 'UPDATE Alumnos SET ci = ?, nombreCompleto = ? WHERE id = ?';
    conexion.query(sql, [ci, nombreCompleto, id], (error, resultados) => {
        if (error) {
            console.error('Error al editar el alumno:', error);
            res.status(500).json({ mensaje: 'Error al editar el alumno' });
        } else if (resultados.affectedRows === 0) {
            res.status(404).json({ mensaje: 'No se encontró ningún alumno con ese ID' });
        } else {
            res.status(200).json({ mensaje: 'Datos del alumno actualizados correctamente' });
        }
    });
};
// Función para buscar un alumno por ID
const buscarAlumnoPorId = (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM Alumnos WHERE id = ?';
    conexion.query(sql, [id], (error, resultados) => {
        if (error) {
            console.error('Error al buscar el alumno:', error);
            res.status(500).json({ mensaje: 'Error al buscar el alumno' });
        } else if (resultados.length === 0) {
            res.status(404).json({ mensaje: 'No se encontró ningún alumno con ese ID' });
        } else {
            res.status(200).json(resultados[0]);
        }
    });
};

module.exports = {
    eliminarAlumno,
    guardarAlumno,
    listarAlumnos,
    listarAlumnosInactivos,
    activarAlumno,
    editarAlumno,
    buscarAlumnoPorId
};