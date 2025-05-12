
const conexion = require('../db/conexion');
const Alumno = require('../Models/Alumnos');

// Función para guardar un alumno
const guardarAlumno = (req, res) => { 
    const { ci, nombreCompleto, cel, grupo } = req.body;
    const estado = true;

    // Verificar si la CI ya está registrada
    const checkSql = 'SELECT * FROM Alumnos WHERE ci = ?';
    conexion.query(checkSql, [ci], (err, resultados) => {
        if (err) {
            console.error('Error al verificar la CI:', err);
            return res.status(500).json({ mensaje: 'Error al verificar la CI' });
        }

        if (resultados.length > 0) {
            return res.status(400).json({ mensaje: 'La CI ya está registrada' });
        }

        // Si no existe, guardar el nuevo alumno
        const nuevoAlumno = new Alumno(null, ci, nombreCompleto, estado, cel, grupo);
        const insertSql = 'INSERT INTO Alumnos (ci, nombreCompleto, estado, cel, grupo) VALUES (?, ?, ?, ?, ?)';
        conexion.query(insertSql, [nuevoAlumno.ci, nuevoAlumno.nombreCompleto, nuevoAlumno.estado, nuevoAlumno.cel, nuevoAlumno.grupo], (error, resultados) => {
            if (error) {
                console.error('Error al guardar el alumno:', error);
                res.status(500).json({ mensaje: 'Error al guardar el alumno' });
            } else {
                res.status(201).json({ mensaje: 'Alumno guardado correctamente', id: resultados.insertId });
            }
        });
    });
};

// Agregamos listarAlumnos al mismo archivo

// Función para listar todos los alumnos
const listarAlumnos = (req, res) => {
    const sql = 'SELECT id, ci, nombreCompleto, estado, cel, grupo FROM Alumnos where estado=1';
    conexion.query(sql, (error, resultados) => {
        if (error) {
            console.error('Error al listar los alumnos:', error);
            res.status(500).json({ mensaje: 'Error al listar los alumnos' });
        } else {
            res.status(200).json(resultados);
        }
    });
};


const listarGruposUnicos = (req, res) => {
    const sql = `
        SELECT DISTINCT grupo
        FROM Alumnos
        ORDER BY grupo ASC
    `;

    conexion.query(sql, (error, resultados) => {
        if (error) {
            console.error('Error al obtener los grupos únicos:', error);
            res.status(500).json({ mensaje: 'Error al obtener grupos únicos' });
        } else {
            res.status(200).json(resultados);
        }
    });
};
const listarAlumnosPorGrupo = (req, res) => {
    const { grupo } = req.body;

    if (!grupo) {
        return res.status(400).json({ mensaje: 'El grupo es requerido' });
    }

    const sql = 'SELECT id, ci, nombreCompleto, estado, cel, grupo FROM Alumnos WHERE grupo = ? AND estado = 1';
    conexion.query(sql, [grupo], (error, resultados) => {
        if (error) {
            console.error('Error al listar alumnos por grupo:', error);
            res.status(500).json({ mensaje: 'Error al listar alumnos por grupo' });
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
    const sql = 'SELECT id, ci, nombreCompleto, estado, cel, grupo FROM Alumnos where estado=0';
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
    const { ci, nombreCompleto, cel, grupo } = req.body;

    const sql = 'UPDATE Alumnos SET ci = ?, nombreCompleto = ?, cel=?, grupo=? WHERE id = ?';
    conexion.query(sql, [ci, nombreCompleto, cel, grupo, id], (error, resultados) => {
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
};const eliminarAlumnoDefinitivamente = (req, res) => {
    const { id } = req.params;

    // Paso 1: Eliminar registros relacionados en la tabla Escritos
    const eliminarEscritos = 'DELETE FROM escritos WHERE alumno_id = ?';

    conexion.query(eliminarEscritos, [id], (errorEscritos) => {
        if (errorEscritos) {
            console.error('Error al eliminar los escritos del alumno:', errorEscritos);
            return res.status(500).json({ mensaje: 'Error al eliminar los escritos del alumno' });
        }

        // Paso 2: Eliminar registros relacionados en la tabla NotasCarne
        const eliminarNotas = 'DELETE FROM notas_carne WHERE alumno_id = ?';

        conexion.query(eliminarNotas, [id], (errorNotas) => {
            if (errorNotas) {
                console.error('Error al eliminar las notas del alumno:', errorNotas);
                return res.status(500).json({ mensaje: 'Error al eliminar las notas del alumno' });
            }

            // Paso 3: Eliminar el alumno
            const eliminarAlumno = 'DELETE FROM Alumnos WHERE id = ?';

            conexion.query(eliminarAlumno, [id], (errorAlumno, resultadosAlumno) => {
                if (errorAlumno) {
                    console.error('Error al eliminar definitivamente el alumno:', errorAlumno);
                    return res.status(500).json({ mensaje: 'Error al eliminar definitivamente el alumno' });
                } else if (resultadosAlumno.affectedRows === 0) {
                    return res.status(404).json({ mensaje: 'No se encontró ningún alumno con ese ID' });
                } else {
                    return res.status(200).json({ mensaje: 'Alumno y todos sus registros relacionados eliminados permanentemente' });
                }
            });
        });
    });
};


module.exports = {
    eliminarAlumno,
    guardarAlumno,
    listarAlumnos,
    listarAlumnosInactivos,
    activarAlumno,
    editarAlumno,
    buscarAlumnoPorId,
    listarAlumnosPorGrupo,
    listarGruposUnicos,
    eliminarAlumnoDefinitivamente
};