// modelos/Alumnos.js

class Alumno {
    constructor(id, ci, nombreCompleto, estado,cel) {
        this.id = Number(id);  
        this.ci = String(ci);  
        this.nombreCompleto = String(nombreCompleto);
        this.estado= Boolean(estado);
        this.cel= String(cel);
        
    }
}

module.exports = Alumno;
