// modelos/Alumnos.js

class Alumno {
    constructor(id, ci, nombreCompleto, estado) {
        this.id = Number(id);  
        this.ci = String(ci);  
        this.nombreCompleto = String(nombreCompleto);
        this.estado= Boolean(estado);
        
    }
}

module.exports = Alumno;
