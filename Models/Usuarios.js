class Usuario {
    constructor({
      id,
      nombreCompleto,
      ci,
      alumnoId,
      usuario,
      contrasena,
      correo,
      perfil_id
    }) {
      this.id = Number(id); // ID único del usuario
      this.nombreCompleto = String(nombreCompleto); // Nombre completo del usuario
      this.ci = String(ci); // C.I. del usuario
      this.alumnoId = Number(alumnoId); // ID del alumno relacionado
      this.usuario = String(usuario); // Nombre de usuario
      this.contrasena = String(contrasena); // Contraseña del usuario
      this.correo = String(correo); // Correo del usuario
      this.perfil_id= Number(perfil_id);
    }
  }
  
  module.exports = Usuario;
  