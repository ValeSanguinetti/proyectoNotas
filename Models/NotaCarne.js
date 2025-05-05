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
    this.comprension_lectura = Number(comprension_lectura);
    this.produccion_texto = Number(produccion_texto);
    this.produccion_oral = Number(produccion_oral);
    this.comprension_auditiva = Number(comprension_auditiva);
    this.tareas = Number(tareas);
    this.escritos = Number(escritos);
    this.conceptos = String(conceptos);
    this.publicado= Boolean(publicado);
  }
}

module.exports = NotaCarne;
