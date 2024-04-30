class Customer {
  identificacion: string;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string
  direccion: string;
  telefono: string;

  constructor(
      identificacion: string, nombre: string,
      apellido: string, direccion: string, 
      telefono: string, correo: string,  contrasena: string
  ) {
      this.identificacion = identificacion;
      this.nombre = nombre;
      this.apellido = apellido;
      this.direccion = direccion;
      this.telefono = telefono;
      this.correo = correo;
      this.contrasena = contrasena;
  }
}

export default Customer;