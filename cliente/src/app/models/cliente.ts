export class Cliente {
    _id?: number;
    nombre: string;
    email: string;
    telefono: string;

  
    constructor(nombre: string, email: string, telefono: string) {
      this.nombre = nombre;
      this.email = email;
      this.telefono = telefono;
    }
  }