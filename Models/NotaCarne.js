class NotaCarne {
  constructor({
    id,
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
  }) {
    this.id = Number(id);
    this.alumnoId = Number(alumnoId); 
    this.grado = String(grado);
    this.mes = String(mes);
    this.anio = Number(anio);
    this.comprension_lectura = String(comprension_lectura);
    this.produccion_texto = String(produccion_texto);
    this.produccion_oral = String(produccion_oral);
    this.comprension_auditiva = String(comprension_auditiva);
    this.tareas = String(tareas);
    this.escritos = String(escritos);
    this.conceptos = String(conceptos);
    this.publicado= Boolean(publicado);
  }
}

module.exports = NotaCarne;
