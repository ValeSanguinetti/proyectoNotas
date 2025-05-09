const conexion = require('../db/conexion');
const Escrito = require('../Models/Escritos');

const API_BASE_URL = 'https://proyectonotas-production-253c.up.railway.app';
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const crearcarne= async (req, res) => {
    try {
        const alumnoId = req.body.alumnoId;

        if (!alumnoId) {
          return res.status(400).json({ mensaje: 'Falta el ID del alumno.' });
        }
    
        const sql = `
          SELECT n.*, a.nombreCompleto 
          FROM notas_carne n
          INNER JOIN Alumnos a ON n.alumno_id = a.id
          WHERE n.anio = YEAR(NOW()) AND n.alumno_id = ?
          ORDER BY n.id DESC
        `;
  
      conexion.query(sql, [alumnoId], async (error, resultados) => {
        if (error) {
          console.error('Error al obtener notas:', error);
          return res.status(500).json({ mensaje: 'Error al obtener notas' });
        }
  
        if (resultados.length === 0) {
          return res.status(404).json({ mensaje: 'No se encontraron notas para ese alumno.' });
        }
  
        // Mapeo de mes -> trimestre
        const mapearTrimestre = (mesTexto) => {
          mesTexto = mesTexto.toLowerCase();
          const trimestres = [];
        
          if (mesTexto.includes('marzo') || mesTexto.includes('abril') || mesTexto.includes('mayo')) {
            trimestres.push('t1');
          }
          if (mesTexto.includes('junio') || mesTexto.includes('julio') || mesTexto.includes('agosto')) {
            trimestres.push('t2');
          }
          if (mesTexto.includes('setiembre') || mesTexto.includes('octubre')) {
            trimestres.push('t3');
          }
          if (mesTexto.includes('noviembre')) {
            trimestres.push('t4');
          }
        
          return trimestres;
        };
        const datosPdf = {
          nombreCompleto: resultados[0].nombreCompleto,
          grado: resultados[0].grado,
          anio: resultados[0].anio
        };
        
  
  
        resultados.forEach(nota => {
          const trimestre = mapearTrimestre(nota.mes);
          if (!trimestre) return;
  
          datosPdf[`comprension_lectora_${trimestre}`] = nota.comprension_lectura;
          datosPdf[`produccion_textos_${trimestre}`] = nota.produccion_texto;
          datosPdf[`produccion_oral_${trimestre}`] = nota.produccion_oral;
          datosPdf[`comprension_auditiva_${trimestre}`] = nota.comprension_auditiva;
          datosPdf[`tareas_${trimestre}`] = nota.tareas;
          datosPdf[`escritos_${trimestre}`] = nota.escritos;
          datosPdf[`conceptos_${trimestre}`] = nota.conceptos;
        });
  
        const existingPdfBytes = fs.readFileSync('carne.pdf');
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const form = pdfDoc.getForm();
  
        Object.entries(datosPdf).forEach(([campo, valor]) => {
          try {
            form.getTextField(campo).setText(String(valor));
          } catch (err) {
            console.warn(`Campo no encontrado: ${campo}`);
          }
        });
        form.flatten();
        const pdfBytes = await pdfDoc.save();
        

      const outputPath = path.join(__dirname, '..', 'public', 'pdfs', 'carne_final.pdf');
      fs.writeFileSync(outputPath, pdfBytes);

      const url = `${API_BASE_URL}/public/pdfs/carne_final.pdf`; // Cambia si usas otro dominio o puerto

      res.json({ mensaje: 'PDF generado con éxito.', urlPdf: url });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error generando PDF.' });
    }
  };
  

  
const crearcarnepublicado= async (req, res) => {
  try {
      const alumnoId = req.body.alumnoId;

      if (!alumnoId) {
        return res.status(400).json({ mensaje: 'Falta el ID del alumno.' });
      }
  
      const sql = `
        SELECT n.*, a.nombreCompleto 
        FROM notas_carne n
        INNER JOIN Alumnos a ON n.alumno_id = a.id
        WHERE n.anio = YEAR(NOW()) AND n.alumno_id = ? AND publicado = 1
        ORDER BY n.id DESC
      `;

    conexion.query(sql, [alumnoId], async (error, resultados) => {
      if (error) {
        console.error('Error al obtener notas:', error);
        return res.status(500).json({ mensaje: 'Error al obtener notas' });
      }

      if (resultados.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron notas para ese alumno.' });
      }

      // Mapeo de mes -> trimestre
      const mapearTrimestre = (mesTexto) => {
        mesTexto = mesTexto.toLowerCase();
        if (mesTexto.includes('marzo')) return 't1';
        if (mesTexto.includes('junio')) return 't2';
        if (mesTexto.includes('setiembre') || mesTexto.includes('octubre')) return 't3';
        if (mesTexto.includes('noviembre')) return 't4';
        return null;
      };
      const datosPdf = {
        nombreCompleto: resultados[0].nombreCompleto,
        grado: resultados[0].grado,
        anio: resultados[0].anio
      };
      


      resultados.forEach(nota => {
        const trimestre = mapearTrimestre(nota.mes);
        if (!trimestre) return;

        datosPdf[`comprension_lectora_${trimestre}`] = nota.comprension_lectura;
        datosPdf[`produccion_textos_${trimestre}`] = nota.produccion_texto;
        datosPdf[`produccion_oral_${trimestre}`] = nota.produccion_oral;
        datosPdf[`comprension_auditiva_${trimestre}`] = nota.comprension_auditiva;
        datosPdf[`tareas_${trimestre}`] = nota.tareas;
        datosPdf[`escritos_${trimestre}`] = nota.escritos;
        datosPdf[`conceptos_${trimestre}`] = nota.conceptos;
      });

      const existingPdfBytes = fs.readFileSync('carne.pdf');
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();

      Object.entries(datosPdf).forEach(([campo, valor]) => {
        try {
          form.getTextField(campo).setText(String(valor));
        } catch (err) {
          console.warn(`Campo no encontrado: ${campo}`);
        }
      });
      form.flatten();
      const pdfBytes = await pdfDoc.save();
      

    const outputPath = path.join(__dirname, '..', 'public', 'pdfs', 'carne_final.pdf');
    fs.writeFileSync(outputPath, pdfBytes);

    const url = `${API_BASE_URL}/public/pdfs/carne_final.pdf`; // Cambia si usas otro dominio o puerto

    res.json({ mensaje: 'PDF generado con éxito.', urlPdf: url });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error generando PDF.' });
  }
};

  
module.exports = {
    crearcarne,
    crearcarnepublicado
};
