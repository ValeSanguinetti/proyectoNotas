const conexion = require('../db/conexion');
const NotaCarne = require('../Models/NotaCarne');

const guardarNotaCarne = (req, res) => {
    const {
        alumnoId,
        grado,
        mes,
        comprension_lectura,
        produccion_texto,
        produccion_oral,
        comprension_auditiva,
        tareas,
        escritos,
        conceptos
    } = req.body;

    const anio = new Date().getFullYear(); // Año actual
    const publicado= false;
    const nuevaNota = new NotaCarne({
        id: null,
        alumnoId,
        grado,
        mes,
        anio, 
        comprension_lectura,
        produccion_texto,
        produccion_oral,
        comprension_auditiva,
        tareas,
        escritos,
        conceptos,
        publicado
    });
    const sql = `
        INSERT INTO notas_carne (
            alumno_id, grado, mes, anio, comprension_lectura, produccion_texto, 
            produccion_oral, comprension_auditiva, tareas, escritos, conceptos, publicado
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    const valores = [
        nuevaNota.alumnoId,
        nuevaNota.grado,
        nuevaNota.mes,
        nuevaNota.anio, // agregado
        nuevaNota.comprension_lectura,
        nuevaNota.produccion_texto,
        nuevaNota.produccion_oral,
        nuevaNota.comprension_auditiva,
        nuevaNota.tareas,
        nuevaNota.escritos,
        nuevaNota.conceptos,
        nuevaNota.publicado
    ];

    conexion.query(sql, valores, (error, resultados) => {
        if (error) {
            console.error('Error al guardar la nota:', error);
            res.status(500).json({ mensaje: 'Error al guardar la nota' });
        } else {
            res.status(201).json({ mensaje: 'Nota guardada correctamente', id: resultados.insertId });
        }
    });
};

const listarNotasCarne = (req, res) => {
    const sql = `
        SELECT n.*, a.nombreCompleto 
        FROM notas_carne n
        INNER JOIN Alumnos a ON n.alumno_id = a.id
        ORDER BY n.id DESC
    `;

    conexion.query(sql, (error, resultados) => {
        if (error) {
            console.error('Error al listar las notas:', error);
            res.status(500).json({ mensaje: 'Error al listar las notas' });
        } else {
            res.status(200).json(resultados);
        }
    });
};
const listarNotasCarneActual = (req, res) => {
    const sql = `
        SELECT n.*, a.nombreCompleto 
        FROM notas_carne n
        INNER JOIN Alumnos a ON n.alumno_id = a.id
        WHERE n.anio = YEAR(NOW())
        ORDER BY n.id DESC
    `;

    conexion.query(sql, (error, resultados) => {
        if (error) {
            console.error('Error al listar las notas del año actual:', error);
            res.status(500).json({ mensaje: 'Error al listar las notas del año actual' });
        } else {
            res.status(200).json(resultados);
        }
    });
};
const publicarNotasPorMes = (req, res) => {
    const { mes } = req.body; 
    const anioActual = new Date().getFullYear();

    const sql = `
        UPDATE notas_carne
        SET publicado = TRUE
        WHERE mes = ? AND anio = ?
    `;

    conexion.query(sql, [mes, anioActual], (error, resultados) => {
        if (error) {
            console.error('Error al publicar notas:', error);
            res.status(500).json({ mensaje: 'Error al publicar las notas' });
        } else {
            res.status(200).json({
                mensaje: `Notas de ${mes} del ${anioActual} publicadas correctamente`,
                filasAfectadas: resultados.affectedRows
            });
        }
    });
};

module.exports = {
    guardarNotaCarne,
    listarNotasCarne,
    listarNotasCarneActual,
    publicarNotasPorMes // <--- Añadir esta línea
};
