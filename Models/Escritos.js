class Escrito {
    constructor({ id = null, alumnoId, nombre, fecha, nota, publicado,estado }) {
        this.id = id;
        this.alumnoId = Number(alumnoId); 
        this.nombre = String(nombre);
        this.fecha = fecha ? new Date(fecha) : null;
        this.nota = Number(nota);
        this.publicado= Boolean(publicado);
        this.estado= Boolean(estado);
    }
}

module.exports = Escrito;
